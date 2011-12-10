(function() {
  var MakeHorizontalBarGraph;

  $(document).ready(function() {
    return d3.text("/stolen-vehicles-pt1/stolenvehicles.csv", function(text) {
      var graph, vehicles;
      vehicles = d3.csv.parseRows(text, function(d) {
        return {
          plate: d[0],
          color: d[1],
          make: d[2],
          model: d[3],
          year: parseInt(d[4]),
          type: d[5],
          dateString: d[6],
          date: d3.time.day.utc(new Date(d[6])),
          region: d[7]
        };
      });
      graph = new MakeHorizontalBarGraph({
        el: "#mostCommonStolenMakes"
      });
      return graph.render(vehicles);
    });
  });

  MakeHorizontalBarGraph = Backbone.View.extend({
    width: 480,
    labelPadding: 10,
    leftPadding: 120,
    rightPadding: 40,
    barHeight: 20,
    barPadding: 3,
    render: function(vehicles) {
      var bars, barwidth, makeColors, makes, svg, y,
        _this = this;
      makeColors = {
        Nissan: "#1f77b4",
        Toyota: "#ff7f0e",
        Trailer: "#2ca02c",
        Subaru: "#d62728",
        Mitsubishi: "#9467bd",
        Honda: "#8c564b",
        Mazda: "#e377c2",
        Ford: "#7f7f7f",
        Holden: "#bcbd22",
        Suzuki: "#17becf"
      };
      makes = d3.nest().key(function(d) {
        return d.make;
      }).entries(vehicles);
      makes.sort(function(a, b) {
        return b.values.length - a.values.length;
      });
      this.height = (this.barHeight + this.barPadding) * makes.length;
      svg = d3.select(this.el).append("svg:svg").attr("height", this.height).attr("viewBox", "0 0 " + (this.leftPadding + this.width + this.rightPadding) + " " + this.height).attr("preserveAspectRatio", "none").attr("width", "100%");
      y = d3.scale.linear().domain([0, makes.length]).range([0, this.height]);
      barwidth = d3.scale.linear().domain([
        0, d3.max(makes, function(d) {
          return d.values.length;
        })
      ]).range([0, this.width]);
      bars = svg.selectAll("rect.bar").data(makes).enter().append("svg:rect").attr("class", "bar").attr("x", this.leftPadding).attr("y", function(d, i) {
        return y(i);
      }).attr("width", 0).attr("height", this.barHeight).attr("fill", function(d) {
        return makeColors[d.key] || "grey";
      }).attr("stroke", "black");
      bars.on("mouseover.highlight", function() {
        return d3.select(this).classed("highlight", true);
      }).on("mouseout.highlight", function(d) {
        return d3.select(this).classed("highlight", false);
      });
      bars.transition().duration(1000).delay(function(d, i) {
        return Math.min(i * 100, 20 * 100);
      }).attr("width", function(d) {
        return barwidth(d.values.length);
      });
      svg.selectAll("text.yLabel").data(makes).enter().append("svg:text").attr("x", this.leftPadding - this.labelPadding).attr("y", function(d, i) {
        return y(i);
      }).attr("text-anchor", "end").attr("dominant-baseline", "central").attr("class", "yLabel").attr("dy", this.barHeight / 2).text(function(d) {
        return d.key || "No Make";
      });
      svg.selectAll("text.freq").data(makes).enter().append("svg:text").attr("x", function(d) {
        return _this.leftPadding + barwidth(d.values.length);
      }).attr("y", function(d, i) {
        return y(i);
      }).attr("text-anchor", "start").attr("dominant-baseline", "central").attr("class", "freq").attr("dy", this.barHeight / 2).attr("dx", "+0.5em").text(function(d) {
        return d.values.length;
      });
      return this.$("rect.bar").popover({
        title: function() {
          return "" + this.__data__.values.length + " Stolen " + this.__data__.key + "s";
        },
        content: function() {
          var carBox, content, v, _i, _len, _ref;
          carBox = function(color) {
            return "<div class='carBox' style='background-color: " + color + ";'></div>";
          };
          content = "";
          _ref = this.__data__.values;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            content += carBox(v.color);
          }
          return content + "<br><em>colors shown are the vehicle colors</em>";
        },
        html: true,
        placement: "right"
      });
    }
  });

}).call(this);
