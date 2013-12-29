---
layout: post
title: Visualising NZ's Stolen Cars, Part 2
description: A visualisation of NZ's stolen cars, in Backbone.js, Coffeescript, and d3.js.
categories:
    - visualizations
---

I had a lot of fun making this visualization. [d3.js][d3] +
[Backbone.js][backbone] + [CoffeeScript][coffee] is an amazing combination.

It's all totally standards-compliant HTML5. Boxes are drawn with inline SVG,
<del>and transitions are run in CSS for hardware acceleration</del> (edit: they
aren't by default, you have to do a little extra work for that, see comments).
Popovers are [Twitter Bootstrap][bootstrap].

<div id='stolenvehiclespt2'>
  <h3>Choose a Region</h3>
  <div id='regionChooser'> </div>
  <h3 id='regionTitle'> </h3>
  <div>
    <svg id='weekGraph'> </svg>
  </div>
  <div>
    <svg id='daysGraph'> </svg>
  </div>
</div>

It's crazy how much the number of stolen cars has picked up in the last few
days approaching Christmas.

### A Code Walkthrough

As an example of how to do these things with coffeescript, d3, and backbone,
here's the code used to generate the weekDays graph, showing the number of
stolen vehicles per weekday.

#### The Backbone Bits

The whole widget is in one javascript class that takes care of itself -
WeekGraph. It extends from Backbone.View, and its constructor hooks it up with
an HTML element - `@el`, and a data model - `@model`. The view then listens for
'change' events coming off the model, and rerenders whenever the model changes.
In this way, the view and model stay in sync.

{% highlight coffeescript %}
WeekGraph = Backbone.View.extend
  height: 150
  width: 420
  initialize: ->
    @model.bind "change", => @render()
{% endhighlight %}

That was the wiring (decoupling and dependency injection if you're into that).

#### The d3 Bits

The render() method is where the real magic happens, rendering that data model
into the HTML element, so we can see it on screen.

First, separate the stolen vehicles data by weekday. This is accomplished with
d3.nest().

{% highlight coffeescript %}
  render: ->
    weekDays = d3.nest()
      .key((d) -> d.dayOfWeek)
      .entries(@model.get "selectedVehicles")
{% endhighlight %}
    
We need to separate the weekdays on the graph horizontally across the x axis.

`x` is a function that does this. You could just use a linear function, but d3
has scale function helpers to make changing the domain and range of these
functions really easy, without having to manipulate equations when you want to
change the width.

#### The d3 Scales

{% highlight coffeescript %}
x = d3.scale.linear()
    .domain([0, 6]) # weekdays
    .range([0, 6 * (cellPadding + cellSize)])
{% endhighlight %}

Also, the bars need to have a height, decided by the number of vehicles stolen
that day. `y` is a linear scale that turns vehicles stolen into a pixel height
for the bar.

I'm also making the bar darker when there's more vehicles stolen that day. d3
can also make scales that interpolate between colors. This seemed a bit magic
to me, but really d3 just has a list of color strings, and turns them into RGB
colors and interpolates them.

{% highlight coffeescript %}
maxWeekday = _.max(weekDays, (d) -> d.values.length)
maxPerWeek = maxWeekday.values.length

height = d3.scale.linear()
    .domain([0, maxPerWeek])
    .range([0, @height])

color = d3.scale.linear()
    .domain([0, maxPerWeek])
    .range(["white", "darkblue"])
{% endhighlight %}

#### The d3 Data-DOM Join

Now let's select the SVG element, set the width and height, and do a relational
join between our weekDay data and the bar DOM elements. I'll explain in a second.

{% highlight coffeescript %}
bars = d3.select(@el)
    .attr("width", @width)
    .attr("height", @height)
    .selectAll("rect.weekDay")
    .data(weekDays)
{% endhighlight %}

This `data()` relational join operator gives us three selections:

#### The Updating Elements

1: `update`. data that already existed in the DOM, but might have changed.

So we update the DOM. Use a nice transition of 1000ms. We can pass functions
that have `(d, i)` arguments. `d` is the data associated with that DOM element,
`i` is the data index. Transitions are all interpolated nicely.

{% highlight coffeescript %}
bars
    .transition()
    .duration(1000)
    .attr("x", (d, i) -> x(i))
    .attr("y", (d, i) => @height - height(d.values.length))
    .attr("height", (d, i) -> height(d.values.length))
    .attr("fill", (d) -> color(d.values.length))
{% endhighlight %}

#### The New Elements

2: `enter()`. Like an actor entering the stage. Data that doesn't have a DOM
element yet. So we append elements to the DOM for each new datum, and set the
location, size, class, and fill according to the data values.

{% highlight coffeescript %}
bars.enter()
    .append("svg:rect")
    .attr("x", (d, i) -> x(i))
    .attr("y", (d, i) => @height - height(d.values.length))
    .attr("height", (d, i) -> height(d.values.length))
    .attr("width", cellSize)
    .attr("class", "weekDay")
    .attr("fill", (d) -> color(d.values.length))
{% endhighlight %}

#### The Exiting Elements

3: `exit()`. Like an actor exiting the stage. Elements that don't match up with
any data we have. The elements used to match up with some data, but they don't
any more. So we remove the elements from the DOM.

{% highlight coffeescript %}
bars.exit()
    .remove()
{% endhighlight %}

#### The Popovers

Finally, I hooked up a twipsy overlay on mouseover. This uses twitter
bootstrap's twipsy plugin. It demonstrates how each DOM element contains a
property `__data__` that contains the d3 data.

`@$` is `this.$`, a jQuery selector scoped to the local backbone element. It's
handy to make sure one view doesn't accidentally attach handlers to another
view's elements.

{% highlight coffeescript %}
    @$("rect.weekDay").twipsy
      title: ->
        weekDayName(@__data__.values[0].date) + "<br>" +
        @__data__.values.length + " Reports"
      html: true
      placement: "above"
{% endhighlight %}

I hope this has given you a taste of how general and powerful [d3][d3] is. It's
a really enjoyable library to use, and it combines well with
[Backbone][backbone] and [CoffeeScript][coffee]. Highly recommended.

<style>
    #stolenvehiclespt2 .highlight {
      stroke: blue;
    }
    #stolenvehiclespt2 label {
      display: inline-block;
    }
    .carBox {
        width: 7px;
        height: 12px;
        display: inline-block;
        border: 1px solid black;
        line-height: 6px;
        margin: 1px;
    }
    #stolenvehiclespt2 .regionBox {
      height: 1em;
      display: inline-block;
    }
    /* nicked from bootstrap */
    .twipsy {
      display: block;
      position: absolute;
      visibility: visible;
      padding: 5px;
      font-size: 15px;
      z-index: 1000;
      filter: alpha(opacity=80);
      -khtml-opacity: 0.8;
      -moz-opacity: 0.8;
      opacity: 0.8;
    }
    .twipsy.above .twipsy-arrow {
      bottom: 0;
      left: 50%;
      margin-left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #000000;
    }
    .twipsy.left .twipsy-arrow {
      top: 50%;
      right: 0;
      margin-top: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid #000000;
    }
    .twipsy.below .twipsy-arrow {
      top: 0;
      left: 50%;
      margin-left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #000000;
    }
    .twipsy.right .twipsy-arrow {
      top: 50%;
      left: 0;
      margin-top: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid #000000;
    }
    .twipsy-inner {
      padding: 3px 8px;
      background-color: #000000;
      color: white;
      text-align: center;
      max-width: 200px;
      text-decoration: none;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    .twipsy-arrow {
      position: absolute;
      width: 0;
      height: 0;
    }
    .popover {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      padding: 5px;
      display: none;
    }
    .popover.above .arrow {
      bottom: 0;
      left: 50%;
      margin-left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #000000;
    }
    .popover.right .arrow {
      top: 50%;
      left: 0;
      margin-top: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid #000000;
    }
    .popover.below .arrow {
      top: 0;
      left: 50%;
      margin-left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #000000;
    }
    .popover.left .arrow {
      top: 50%;
      right: 0;
      margin-top: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid #000000;
    }
    .popover .arrow {
      position: absolute;
      width: 0;
      height: 0;
    }
    .popover .inner {
      background: #000000;
      background: rgba(0, 0, 0, 0.8);
      padding: 3px;
      overflow: hidden;
      width: 280px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    }
    .popover .title {
      background-color: #f5f5f5;
      padding: 9px 15px;
      line-height: 1;
      -webkit-border-radius: 3px 3px 0 0;
      -moz-border-radius: 3px 3px 0 0;
      border-radius: 3px 3px 0 0;
      border-bottom: 1px solid #eee;
    }
    .popover .content {
      background-color: #ffffff;
      padding: 14px;
      -webkit-border-radius: 0 0 3px 3px;
      -moz-border-radius: 0 0 3px 3px;
      border-radius: 0 0 3px 3px;
      -webkit-background-clip: padding-box;
      -moz-background-clip: padding-box;
      background-clip: padding-box;
    }
    .popover .content p, .popover .content ul, .popover .content ol {
      margin-bottom: 0;
    }
    .fade {
      -webkit-transition: opacity 0.15s linear;
      -moz-transition: opacity 0.15s linear;
      -ms-transition: opacity 0.15s linear;
      -o-transition: opacity 0.15s linear;
      transition: opacity 0.15s linear;
      opacity: 0;
    }
    .fade.in {
      opacity: 1;
    }
</style>
<script src="/assets/javascripts/jquery-1.7.min.js"> </script>
<script src="/stolen-vehicles-pt2/all.js"> </script>

[d3]: https://mbostock.github.com/d3/
[coffee]: https://jashkenas.github.com/coffee-script/
[backbone]: https://documentcloud.github.com/backbone/
[bootstrap]: https://twitter.github.com/bootstrap/
