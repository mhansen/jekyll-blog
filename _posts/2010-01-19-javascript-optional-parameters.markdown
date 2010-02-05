---
layout: post
title: Optional parameters in Javascript
categories:
    - javascript
---
I've been reading a
[lot](http://github.com/creationix/node-router/blob/master/node-router.js)
[of](http://github.com/ry/node_chat/blob/master/server.js)
[JavaScript](http://github.com/caludio/node.xmlrpc-c)
[code](http://github.com/driverdan/node-XMLHttpRequest/blob/master/XMLHttpRequest.js)
lately, and it's been a joy. I'm picking up on some common JavaScript idioms
too, and I thought I'd share.

Introduction to Optional Parameters
-----------------------------------

Optional parameters are a nice language feature - function parameters that are
given default values if not used when calling a function. Optional parameters
are great for simplifying code, and hiding advanced but not-often-used
functionality. If 90% of the time you're calling a function using the same
values for some parameters, you should look into making those parameters
optional to avoid [Repeating Yourself](http://en.wikipedia.org/wiki/DRY).

Compare this C# code for connecting to a server, first without optional parameters:

{% highlight csharp %}
public void connect() 
    : connect("localhost") {}

public void connect(string hostname) 
    : connect(hostname, 80) {} 

public void connect(string hostname, int port) 
    : connect(hostname, port, "HTTP") {}

public void connect(string hostname, int port, string method); { 
    ... 
}
{% endhighlight %}

Now, with the new C# 4.0 optional parameters, things are a lot simpler:

{% highlight csharp %}
public void connect(string hostname = "localhost", 
                    int port = 80, string method = "HTTP") { ... }
{% endhighlight %}

Method 1: Undefined arguments
-----------------------------

At first glance, javascript has nothing like this available. However,
javascript lets you call functions omitting some parameters, filling in the
other parameters with the value `undefined`.

{% highlight javascript %}
connect("www.google.com");
function connect(hostname, port, method) {
     // inside the function, 
     // hostname === "www.google.com", 
     // port === undefined,
     // method === undefined 
}
{% endhighlight %}

It's easy to check if a value is `undefined` and fill it in with a default
parameter if it is:

{% highlight javascript %}

function connect(hostname, port, method) {
    if (hostname === undefined) hostname = "localhost";
    if (port === undefined) port = 80;
    if (method === undefined) method = "HTTP";
}
{% endhighlight %}

However, there's a prettier shortcut:

{% highlight javascript %}
function connect(hostname, port, method) {
    hostname = hostname || "localhost";
    port = port || 80;
    method = method || "GET";
}
{% endhighlight %}

The short-circuit OR operator `||` returns the left side if the left argument
is truthy (evaluates to `true` in conditionals), otherwise it checks if the
right argument is truthy, returning it. We can use this shortcut because
`undefined` is falsy: in conditionals, `undefined` evaluates to `false`.

This shortcut approach is a very common idiom, but it does have a disadvantage:
You can't use for any argument that could accept a falsy value: `false`, `0`,
`null`, `undefined`, the empty string `""`, and `NaN`.

Using the `||` shortcut will override any falsy input value. If you expect a
falsy value, you must explicitly check for `argument === undefined`.

This method only allows the last arguments to be optional - you cannot make an
optional first parameter, middle parameter, or combination of parameters
optional. The next methods let you position optional arguments anywhere.

Method 2: The arguments variable
--------------------------------

All javascript functions get passed an implicit `arguments` variable when
they're called. `arguments` is an array containing the values of all the
arguments passed to the function. Here's a function that takes any arguments
and `alert()`'s them:

{% highlight js %}
alertArgs("arg1", 12.3, true, "arg4");
function alertArgs() {
    alert(JSON.stringify(arguments));
    /* alerts '[ "arg1", 12.3, true, "arg4" ]' */
}
{% endhighlight %}


{% highlight js %}

function connect() {
    hostname = arguments[0] || "localhost";
    port = port arguments[1] || 80;
    method = arguments[2] || "GET";
}
/* example: do a GET request to www.example.com on port 80 */
connect("www.example.com");

{% endhighlight %}

Method 3: The object literal
----------------------------

Javascript has a cheap and easy object literal syntax, so why not use this to
make flexible and readable optional arguments?

{% highlight js %}
function connect(hostname, options) {
    var options = options || {};
    var port = options.port || 80;
    var method = options.method || "GET";
}
connect("www.example.com", { port: 8080, method: "POST" });
connect("www.google.com");
{% endhighlight %}

Note that you need to ensure that an object is passed into `options`,
replace it with an empty object `{}`, or you will get errors trying to read
properties from `undefined`.

A combination of all three methods
----------------------------------

Here's an example, from node.js's process.watchFile(filename, options,
listener) function. It's used to watch `filename` for changes, calling
`listener` when it does. In this function, the `options` argument is
optional:

{% highlight js %}
process.watchFile = function (filename) {
  var options;
  var listener;

  if ("object" == typeof arguments[1]) {
    options = arguments[1];
    listener = arguments[2];
  } else {
    options = {};
    listener = arguments[1];
  }

  if (options.persistent === undefined) options.persistent = true;
  if (options.interval === undefined) options.interval = 0;
  
  /* SNIP: main function logic */
}

/* example: watch file '/etc/passwd' for changes */
process.watchFile('/etc/passwd', function() { 
   log("passwd file changed");
}
{% endhighlight %}
