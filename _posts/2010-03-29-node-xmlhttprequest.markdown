---
layout: post
title: Updated node-XMLHttpRequest
description: Updating node-XMLHttpRequest to the latest node API
categories:
- javascript
- node.js
- open source
---

I had an evening off from assignments, so I 
[updated node-XMLHttpRequest](http://github.com/mhansen/node-XMLHttpRequest/commits/master)
to reflect the extensive changes in the latest node.js API (0.1.33).

[node-XMLHttpRequest](http://thedanexperiment.com/2009/10/04/emulating-xmlhttprequest-in-node-js/)
is a port of the browser's XMLHttpRequest object to node.js, to help ease
porting of browser-based javascript to the node.js platform.

## Race Conditions
I thought I was going crazy when the HTTP Client silently failed to connect to
the HTTP server. Eventually I found a race condition was set up in some test
code between starting an HTTP server and starting the HTTP Client. It seems the
http.createServer call is made asynchonously (like everything in node), and
there's no event listener for when the server has binded to a port, so you
just have to guess when it's ready to take your connection.

That's easy enough, as a quick hack: good old `setTimeout` delayed invocation
of the client for 100 milliseconds.

{% highlight js %}
http.createServer(/*SNIP*/).listen(8000);

setTimeout(function() {
    /* set up a client to connect to the above server */
}, 100)
{% endhighlight %}

## HTTP Headers are case-insensitive
The old tests had an assertion, which was failing:

{% highlight js %}
var headers = "Content-Type: text/plain\r\nContent-Length: 11\r\nConnection: close";
assertEquals(headers, this.getAllResponseHeaders());
// assertion failed: 
// expected: 'Content-Type: text/plain\r\nContent-Length: 11\r\nConnection: close'
// actual:   'content-type: text/plain\r\ncontent-length: 11\r\nconnection: close'
{% endhighlight %}

I did some research on 
[why node.js lowercases header names](http://groups.google.com/group/nodejs/browse_thread/thread/d5aba0d09abcad86/8222513e6e4a3a27)
and was surprised to find that the 
[RFC 2616 defines HTTP Headers to be case-insensitive](http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2).

HTTP agents are free to manipulate the case of headers, so agents shouldn't
depend on the header having a certain case. Oops.

So why does node.js automatically lowercase these headers, instead of leaving
them unchanged? Let's look at these options.

### Pass on the headers to the user of the code, unchanged.

To be RFC 2616h compliant, the programmer would have to do a case-insensitive
match on the headers. [Not trivial when the headers are given as keys to an object](http://groups.google.com/group/nodejs/msg/0c3e638f53d0a859):

{% highlight js %}
var contentType; 
for (var header in req.headers) { 
    //case insensitive match
    if (header.match(/Content-Type/i) { 
            contentType = req.headers[header]; 
            break; 
    } 
}
{% endhighlight %}


### Enforce strict lowercase or uppercase on headers.

Clients can access the headers with:

{% highlight js %}
var contentType = request.headers['content-type']
{% endhighlight %}

Put like that, it's kind of a no-brainer. I'm grateful to node.js for helping
me make my code not only compliant, but also liberal in what it accepts. And I
don't even have to lift a finger. Awesome!
