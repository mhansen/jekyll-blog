---
title: "Unit Testing a Javascript Project: Part 2"
layout: post
categories: 
- javascript
- node.js
- testing
- antinode
--- 
In my [last post](/antinode-testing), I outlined plans for adding unit tests to
[Antinode](http://github.com/mhansen/antinode), my javascript web server. I
tried implementing those plans today, and boy, did things get hairy. 

Closures Simplify Code
======================

If all functions are pure (and pure in this sense means the functions only
access data passed into them as arguments), then it's easy to unit-test them.
If they don't depend on other variables (global variables or closure variables)
then it's easy to test the behaviour of a function based on its dependencies:
you have complete control over them when you call the function!

e.g.  It's difficult to test this `unpure_server_error` function for correct
behaviour under different values of `http_response`.

{% highlight js %}
var http_response;

function unpure_server_error() {
    http_response.sendHeader(500);
    http_response.sendBody("500 Server Error");
    http_response.finish();
}
{% endhighlight %}

But `pure_server_error` is easy to test for different values of
http_response: to test with a different response, just pass another one in as
an argument! It's easy to test from a separate file if you export the functions
you'd like to test into a module.

{% highlight js %}
function pure_server_error(http_response) {
    if (http_response.uri && wehavehostname() {
        http_response.
    http_response.sendHeader(500);
    http_response.sendBody("500 Server Error");
    http_response.finish();
}
{% endhighlight %}

I planned to enabled testing of all these functions by making them pure (and
remember, in this article, a pure function is one that 'only operates on its
arguments); e.g. refactor code like this:

{% highlight js %}
function streamFile(file, response) {
    function fileNotFound() {
        response.sendHeader(404);
        response.finish();
    }
    if (cantFind(file)) fileNotFound();
}
{% endhighlight %}

Now I'd have code like 

{% highlight js %}
function streamFile(file, response) {
    if cantFind(file) fileNotFound(response);
}
function fileNotFound(response) {
    response.sendHeader(404);
    response.finish();
}
{% endhighlight %}

While this sounds like a great idea, it turned out to make code harder to read.

- Node.js is an evented framework, and hence relies heavily on callbacks.
  Callbacks are simple if the callback function has no arguments - they're
  chunkier, and less readable if they have less arguments. For functions like 
  file_not_found, which can be called by many parts of the code if it discovers 
  a file is missing, it's much nicer to look at

{% highlight js %}
check_if_file_exists()
  .addCallback(some_success_function)
  .addErrback(file_not_found);
{% endhighlight %}

than

{% highlight js %}
check_if_file_exists()
  .addCallback(some_success_function)
  .addErrback(function() {
      file_not_found(http_response);
  });
{% endhighlight %}

Pure functions => more arguments => more chunkier callbacks => less readable
code, an explicit non-goal of the refactoring.

Also note that the functions would be moved out from inside other functions, e.g. 
out of the flow of code, making the code less easy to read. Javascript allows for 
very literate programming: with functions declared inside the flow of code, right 
where they are called. It's a huge advantage to see what a function does right
where it's used, without having to jump around the source code, wasting your
time figuring out the flow of the program.

## System-Level Testing

Antinode is a tiny webserver. The main logic of the program is less than 150
lines of code. It's small enough, that it can be considered a 'unit' for
testing.

So, instead of function-level unit tests (that would compromise readability),
I'm going to try to make system-level tests, similar to the 
[tests for node.js's HTTP library](http://github.com/ry/node/blob/master/test/mjsunit/test-http.js).

These tests will run an Antinode webserver, serving up a directory of test
content. It's important that I'm able to control the timestamps on these files,
as they influence Antinode's behaviour with things like the Last-Modified
header and, eventually, some HTTP caching options.

These tests could be run from any language with an HTTP client, but I'll
probably write them using javascript, for code symmetry.

As Antinode adds features, I'll probably push some related bits of code into
other modules, and then I'll revisit unit testing at the module level.
