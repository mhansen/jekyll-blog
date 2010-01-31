---
layout: post
title: Optional parameters in Javascript
---
I've been reading a 
[lot](http://github.com/creationix/node-router/blob/master/node-router.js)
[of](http://github.com/ry/node_chat/blob/master/server.js)
[JavaScript](http://github.com/caludio/node.xmlrpc-c)
[code](http://github.com/driverdan/node-XMLHttpRequest/blob/master/XMLHttpRequest.js)
lately, and it's been a joy. I'm picking up on some common JavaScript idioms too, and I thought I'd share.

Optional parameters are a nice language feature - function parameters that are given default values if not used when calling a function. Optional parameters are great for simplifying code, and hiding advanced but not-often-used functionality. If 90% of the time you're calling a function using the same values for some parameters, you should look into making those parameters optional to avoid [Repeating Yourself](http://en.wikipedia.org/wiki/DRY).

Compare this C# code for connecting to a server, first without optional parameters:

{% highlight csharp %}
public void connect() : connect("localhost") {}
public void connect(string hostname) : connect(hostname, 80) {} 
public void connect(string hostname, int port) : connect(hostname, port, "HTTP") {}
public void connect(string hostname, int port, string method); { ... }
{% endhighlight %}

 Now, with the new C# 4.0 optional parameters, things are a lot simpler:

{% highlight csharp %}
public void connect(string hostname = "localhost", 
                    int port = 80, string method = "HTTP") { ... }
{% endhighlight %}

 At first glance, javascript has nothing like this available. However, javascript lets you call functions omitting some parameters, filling in the other parameters with the value 'undefined'.

{% highlight javascript %}
connect("www.google.com");
function connect(hostname, port, method) {
     // inside the function, 
     // hostname == "www.google.com", 
     // port == undefined,
     // method == undefined 
}
{% endhighlight %}

 It's easy to check if a value is 'undefined' and fill it in with a default parameter if it is:

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
    method = method || method;
}
{% endhighlight %}

The short-circuit OR operator || returns the left side if the left argument is truthy (evaluates to true in conditionals), otherwise it checks if the right argument is truthy, returning it. We can use this shortcut because 'undefined' is falsy: in conditionals, 'undefined' evaluates to false.

 This shortcut approach seems to be a common idiom, but it does have a disadvantage: You can't use it for optional boolean arguments with a default argument of true. 'false || true' will always evaluate to true. Instead, you must explicitly check for undefined.
