---
title: Don't debug with JSON.Stringify
layout: post
description: Better ways to debug javascript in node.js
categories:
- javascript
- node.js
---

I've been having some problems using JSON.Stringify to inspect objects while
debugging inside [node.js](http://nodejs.org). It seems like a great choice:

{% highlight javascript %}
var obj = { 
    "prop1" : "value1", 
    "prop2" : 5
}
print(JSON.stringify(obj));
//prints: {"prop1":"value1","prop2":5}
{% endhighlight %}

But there are gotchas:

{% highlight javascript %}
var infinity = 1 / 0;
var func = function() {};
func.innerproperty = "value";
var obj = {
    "prop1" : func,
    "prop2" : undefined,
    "prop3" : infinity
}
print(JSON.stringify(obj);
//prints {"prop3":null}
{% endhighlight %}

Oh no! JSON.Stringify has 
- ignored `prop1`, a function
- ignored `func.innerproperty` 
- ignored `prop2`, an undefined value
- replaced `prop3`'s `Infinity` with `null`.

Yikes! This is because JSON, being a pure data interchange format, has no
notation for functions. Or undefined values. And it replaces nonfinite numbers
with `null`.

In node.js, there's a dedicated function for stringifying objects for
debuggings: `sys.inspect(object)`. See the 
[API docs](http://nodejs.org/api.html#_system_module). This fares somewhat
better for the last example, outputting:

    {
     "prop1": [Function],
     "prop2": undefined,
     "prop3": Infinity
    }

<del>However, note that it doesn't check for function properties.
`prop1.innerproperty` is ignored.</del> 
_EDIT_: I opened an
[issue](http://github.com/ry/node/issues#issue/61), and it was fixed in less
than a day. Functions with properties are now listed too.  Thanks,
[creationix](http://github.com/creationix)!

This is pretty important, because it's very common to use functions as property
holders in popular javascript libraries.

- [jQuery](http://jquery.com/) uses `$` both as a selector function, and a
  library object
- [underscore.js](http://documentcloud.github.com/underscore/) uses `_` as a
  wrapper function, and a library object
