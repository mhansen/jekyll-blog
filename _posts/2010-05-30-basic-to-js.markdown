---
title: Porting BASIC to JS
layout: post
description: My experiences porting some old BASIC code to JavaScript.
categories:
    - BASIC
    - JavaScript
---

A few weeks ago, I heard one of my friends was trying to port some old BASIC
code to PHP. (Why? I'm still not sure.) 

Somehow, the mention of BASIC triggered some nostalgia for the days of cutting
my teeth programming on the 
[Apple IIc](http://en.wikipedia.org/wiki/Apple_iic), typing in BASIC programs
from a book. I had to have a go.

So I ported the old code to JavaScript.

It was a lot easier than I expected - mostly because both languages have global
scope by default. 

JavaScript gives you the option of global or local scope every time you declare
a variable - if you declare it with `var` it is local to the function.

{% highlight js %}
var a = "a function-scoped variable";
b = "a global variable";
{% endhighlight %}

I never thought I'd see global scope as a feature, but it really helps porting
from BASIC :)

The code tells you sunrise and sunset times anywhere in the world, so it uses a 
bit of trigonometry. BASIC defines the `SIN`, `COS`, `SQR`, `ATN`, and `SGN`
functions.  Plugging these into JavaScript was easy:

{% highlight js %}
var SIN = Math.sin;
var COS = Math.cos;
var SQR = Math.sqrt;
var ATN = Math.atan;
function SGN(num) {
    if (num < 0) return -1;
    if (num > 0) return +1;
    return 0;
}
{% endhighlight %}

The rest of the code was just converting 

* `GOSUB` -> function calls
* `GOTO` -> `if`/`else` statements
* colons -> semicolons
* array indexing from one-based to zero-based
* removing line numbers.

Easy.

Of course, the code is [up on GitHub](http://github.com/mhansen/suntimes).
I'm a little disappointed GitHub doesn't have syntax highlighting for BASIC. ;)
