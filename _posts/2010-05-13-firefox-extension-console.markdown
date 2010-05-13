---
title: Log to the Error Console from a Firefox Extension
description: How to use the Firefox logger from inside Firefox Extensions
layout: post
categories: 
- firefox extensions
---

To log to the console from inside a firefox extension's javascript:

{% highlight js %}
Application.console.log("Hello from my Firefox Extension!");
{% endhighlight %}

Get at the output from Tools -&amp; Error Console.

If you're doing Firefox Extension development, you can't log to the Firebug
console using `console.debug(object)` like you're used to ('console is not
defined'). 

At the time of writing, the ChromeBug XUL debugger (developed to debug firebug)
is horribly buggy, and doesn't have a console. So it's either this, or alert()
statements.
