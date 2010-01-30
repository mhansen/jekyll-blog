---
layout: post
title: Peter Norvig's "Design Patterns in Dynamic Programming"
---

Today I read something that's been sitting in my bookmarks for a few months now: Peter Norvig's 1996 [slides](http://norvig.com/design-patterns/) on Design Patterns in Dynamic Programming.

I've been toying around with dynamic languages a lot lately, and I've been excited at the flexibility and simplicity offered by features like first-class functions and types. These features are noticeably absent from traditional languages like Java and C++.

It was a bit tricky to understand the slides where the examples are written in [Dylan](http://en.wikipedia.org/wiki/Dylan_(programming_language)), a language I'd never heard of before today. Dylan is a very Ruby-like language developed in the early 1990s by Apple.

The slides make a good case for using languages with first-class types and first class functions (i.e. you can pass functions and types as variables at runtime). Common patterns like Factory, Strategy, and Observer become simpler. Here's a few examples:

## Strategy Pattern
You don't need full-blown classes just to hold a function/routine. Just pass the function!

{% highlight javascript %}
var bird = { "observers" : [] };
var birdObserver = { "onBirdChange" : function() { alert("The Bird Moved!"); } };
bird.observers.push(function() { birdObserver.onBirdChange(); }
{% endhighlight %}

## Factory Pattern
The Factory Pattern defers deciding the type of an object instatiation till runtime. This is trivial with first-class types:

{% highlight javascript %}
var carType = getTypeFromConfigFile();
var car = carType.new();
{% endhighlight %}

## Observer Pattern
The Observer pattern calls a function somewhere when an object changes. Of course, this gets simpler when functions are first-class. Without first-class functions, observers need to inherit a common base class. With first-class functions, you can maintain a list of observers as a list of functions, and one object can observe many others easily.
