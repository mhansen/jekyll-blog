$(document).ready ->
  d3.text "/stolen-vehicles-pt1/stolenvehicles.csv", (text) ->
    vehicles = d3.csv.parseRows text, (d) ->
      plate: d[0]
      color: d[1]
      make: d[2]
      model: d[3]
      year: parseInt d[4]
      type: d[5]
      dateString: d[6]
      date: d3.time.day.utc(new Date(d[6]))
      region: d[7]
    graph = new MakeHorizontalBarGraph(el: "#mostCommonStolenMakes")
    graph.render(vehicles)

MakeHorizontalBarGraph = Backbone.View.extend
  width: 480
  labelPadding: 10
  leftPadding: 120
  rightPadding: 40
  barHeight: 20
  barPadding: 3

  render: (vehicles) ->
    makeColors =
      Nissan: "#1f77b4", Toyota: "#ff7f0e"
      Trailer: "#2ca02c", Subaru: "#d62728"
      Mitsubishi: "#9467bd", Honda: "#8c564b"
      Mazda: "#e377c2", Ford: "#7f7f7f"
      Holden: "#bcbd22", Suzuki: "#17becf"

    makes = d3.nest().
      key((d) -> d.make).
      entries(vehicles)

    makes.sort (a, b) ->
      b.values.length - a.values.length

    @height = (@barHeight + @barPadding) * makes.length

    svg = d3.select(@el)
      .append("svg:svg")
      #.attr("width", @leftPadding + @width + @rightPadding)
      .attr("height", @height)
      .attr("viewBox", "0 0 #{@leftPadding + @width + @rightPadding} #{@height}")
      .attr("preserveAspectRatio", "none")
      .attr("width", "100%")

    y = d3.scale.linear().
      domain([0, makes.length]).
      range([0, @height])

    barwidth = d3.scale.linear().
      domain([0, d3.max(makes, (d) -> d.values.length)]).
      range([0, @width])

    bars = svg.selectAll("rect.bar")
      .data(makes)
      .enter()
      .append("svg:rect")
      .attr("class", "bar")
      .attr("x", @leftPadding)
      .attr("y", (d, i) -> y(i))
      .attr("width", 0)
      .attr("height", @barHeight)
      .attr("fill", (d) -> makeColors[d.key] or "grey")
      .attr("stroke", "black")

    bars.on("mouseover.highlight", ->
        d3.select(this).classed("highlight", true))
      .on("mouseout.highlight", (d) ->
        d3.select(this).classed("highlight", false))

    bars.transition()
      .duration(1000)
      .delay((d, i) -> Math.min(i * 100, 20 * 100))
      .attr("width", (d) -> barwidth(d.values.length))

    svg.selectAll("text.yLabel").
      data(makes).
      enter().
      append("svg:text").
      attr("x", @leftPadding - @labelPadding).
      attr("y", (d, i) -> y(i)).
      attr("text-anchor", "end").
      attr("dominant-baseline", "central").
      attr("class", "yLabel").
      attr("dy", @barHeight/2).
      text((d) -> d.key or "No Make")

    svg.selectAll("text.freq").
      data(makes).
      enter().
      append("svg:text").
      attr("x", (d) => @leftPadding + barwidth(d.values.length)).
      attr("y", (d, i) -> y(i)).
      attr("text-anchor", "start").
      attr("dominant-baseline", "central").
      attr("class", "freq").
      attr("dy", @barHeight/2).
      attr("dx", "+0.5em").
      text((d) -> d.values.length)

    @$("rect.bar").popover
      title: -> "#{@__data__.values.length} Stolen #{@__data__.key}s"
      content: ->
        carBox = (color) ->
          "<div class='carBox' style='background-color: #{color};'></div>"
        content = ""
        for v in @__data__.values
          content += carBox(v.color)
        content + "<br><em>colors shown are the vehicle colors</em>"
      html: true
      placement: "right"
