---
layout: post
title: Unit Testing a Javascript Project
published: false
categories:
 - javascript
 - unit testing
 - antinode
---

Apologies for this post - it's very stream-of-consciousness, it's more to help
me figure out what to do by brainstorming than anything.

Antinode is getting a lot of features added to it, and with features comes
complexity.  While the server is still simple (<15SLOC), I'd like to write some
tests for it, so I know immediately if I break things.

Ideally I'd like to put all my tests in a separate file e.g. `test.js`. And
call my tests from the command line

{% highlight sh %}
    $ cd antinode
    $ node test.js
{% endhighlight %}

However, I don't want to compromise on code readability. I've seen code that
enables testing that handles testing by using many levels of indirection, which
I find very difficult to keep track of. I prefer simple, easy-to-read code that
sets out explicitly what the program is doing, to easy-to-test code that has me
scratching my head following multiple levels of indirection.

The webserver code's readability prompted me to work on it in the first place.
I was impressed with how simple, clean and elegant the code was, with a minimum
of boilerplate, and inner functions clearly presenting code flow. I'd like to
keep the server simple, and thus accessible, in the same way it was to me, while
adding more features.

At the moment, Antinode is difficult to test from outside. It's a logging
webserver, so by nature it has a lot of side effects on the network and
console, and soon, log files. These dependencies make it difficult to unit test.

Antinode's written in javascript, and it makes full use of closures and inner
functions. While using inner functions enhances readability, it is impossible
to access inner functions from outside their containing function, which is
essential for testing.

Problems/Solutions:
-------------------

 - *Logging side effects*: If I outsource logging to a good logging library with
   the ability to turn off console/file logging completely, this is a non-issue.

 - *Network side effects*: I could test the whole webserver as a blackbox, but
   that wouldn't be ideal. I'd have to launch a server to listen on a port,
   have it serve up a test directory, and then try and 'GET' all these
   resources, and compare the output for expected values. This seems very
   heavyweight - i'd be testing the entire system at once. I'd need a huge
   number of tests to go through all possible code paths - much more than if I
   test each function individually.

 - *Inaccessible Inner Functions*: I could assign these inner functions to the
   `exports` variable at the time of declaration, to have them exported as a
   module for easy testing from another file. However, this decreases the
   signal-to-noise ratio, and readability of the server code. Every time I
   declared an inner function, I'd also have another line adding it to the
   exports variable. I could move the inner functions outside, so they are
   reachable by test code.

These inner functions are quite a problem - because I like them. They help me
make sense of the code better than outer functions.
When a function is declared inside another function, only the outer function
can call the inner function. You know for sure that the only place that
function will be called from is the outer function - not from anywhere else in
the program. I find this simplifies my mental model of the code, while also
allowing for more readable code.





[example: three outer function calls. then three inner function calls]

Your brain isn't burdened with following pointers to see what the code does.
You don't have to look at the name, and navigate to that function, then
navigate back. With inner functions, the function is right where it needs to
be, in the flow of code where it will execute.

Of course, if your function has a good name and a clear purpose, you shouldn't
need to follow it to find out what it does.

Also, with closures you can access variables in the parent scope. This allows
for some neat tricks and easy organisation of variables (this variable is
declared in this function, so it can only be changed by this function and
its inner functions). For example, in antinode, the `stream(path, resp)`
function is passed the http response object as `resp`, and all the inner
functions of `stream` automatically have access to the response variable,
without needing it passed to inner function's arguments. This keeps the code
clearer, but it does make me feel a little uneasy in the same way as modifying
global variables. And dependencies on all these variables that are only
available through closure make the function impossible to unit test.

In conclusion, antinode will have to be refactored before unit tests can be added. Goals of the refactoring will include:

 - Making functions pure (functions operate only on their arguments - no accessing 
   variables through closure). Pure functions are easy to test - simply pass in test
   values/mock objects as arguments. No scaffolding required!

 - Moving inner functions outside their parents, and exporting all testable
   functions at the start of the code, or:

 - Keeping inner functions in the same place, but exporting them right where
   they are declared. Need to read up on scoping rules to ensure sure outer
   scope variables aren't clobbered by inner scope variables. e.g.

{% highlight javascript %}
    outerFunction("foo");
    function outerFunction(path) {
        path += "bar";
        innerFunction(path);
        function innerFunction(path) {
            print(path); //will this print "foo" or "foobar"?
            path = ""; //will this clobber the outer function's path too?
        }
    }
{% endhighlight %}

OK! Now I have a plan. Time to start coding!
