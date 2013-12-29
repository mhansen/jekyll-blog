---
layout: post
title: Visualising New Zealand's Stolen Vehicle Database
description: Making graphs showing the most popular stolen cars and other vehicles in New Zealand.
categories:
    - visualizations
---
<div id="mostCommonStolenMakes" style="height:600px; overflow-y:scroll;">
<h4>Stolen Vehicles, by Make</h4>
</div>

Mouseover the bars for a visualisation of the colors of the stolen cars.

### The Database

A few days ago, the NZ Police [launched][2] a [public database of stolen cars][1]. It's a
snapshot taken from the Police Vehicle of Interest database, updated 3x daily.

<blockquote>
<p>"It will be a resource for security guards, insurance companies, moteliers,
scrap metal dealers and community policing patrols."</p>
<p>...</p>
<p>"It also has obvious benefits for people buying second-hand vehicles, garages
that service vehicles and service stations where petrol thefts can regularly be
associated with stolen vehicles."</p>
<p>...</p>

<p>"Potentially, it gives police many more pairs of eyes out there. People can do
their own checking and then report it to Police."
</p>
</blockquote>

This sounds like a goldmine of interesting data. I grabbed the list of all the
cars stolen in the last six months. It comes in a handy CSV file. For example,
here's the first four vehicles:

    Plate,Color,Make,Model,Year,Type,Date,Region
    007579,Blue,Yamaha,TTR230,2007,Trail Bike,2011-07-14,Bay of Plenty
    0BOOST,Blue,Honda,ACCORD,2003,Saloon,2011-06-19,Counties/Manukau
    1045Z,Orange,Trailer,HOMEMADE,1972,Trailer,2011-11-07,Eastern
    1079Y,Silver,Trailer,ABEL K8SSA,2001,Trailer,2011-07-14,Waitemata
    ...

So I decided to have a crack at visualising the data. Above is the first
interactive graphic I've published - the most popular makes of stolen vehicles.

### Visualisation Tech

This visualisation was a great excuse to play around with some new tech.
Rendering is done with SVG, controlled by the excellent [d3 visualisation
library][3].  Popovers are care of [Twitter Bootstrap][4], which rocks,
although I did have to put in a [pull request with fixing the popovers for
SVG][5].

Sorry Android 2.3 users, your browser doesn't do SVG, so you'll need to use a
desktop browser to see.

I was very impressed with d3's flexibility and conciseness, and I'm looking
forward to using it on more projects. I may blog about how awesome the d3
experience was later. If you're into making visualisations, I heartily
recommend checking d3 out.

<style>
.highlight {
    fill-opacity: 0; 
}
.carBox {
    width: 5px;
    height: 10px;
    display: inline-block;
    border: 1px solid black;
    line-height: 6px;
}
/* nicked from bootstrap */
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
<script defer="true" src="/stolen-vehicles-pt1/d3.min.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/d3.csv.min.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/d3.time.min.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/underscore-min.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/backbone-min.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/bootstrap-twipsy.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/bootstrap-popover.js"> </script>
<script defer="true" src="/stolen-vehicles-pt1/main.js"> </script>

[1]: http://www.police.govt.nz/stolen/vehicles
[2]: http://www.police.govt.nz/news/release/30151.html
[3]: http://mbostock.github.com/d3/
[4]: http://twitter.github.com/bootstrap/
[5]: https://github.com/twitter/bootstrap/pull/744
