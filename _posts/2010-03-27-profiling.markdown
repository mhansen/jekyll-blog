---
title: Trust the Profiler
layout: post
description: Profiling algorithms in Java
categories: 
- profiling
- Java
---
I was totally wrong.

I've been working on an LZW data compressor for my Algorithms paper with a
partner.

We thought we were being smart about it - we designed our data structures to
use a [multiway trie](http://en.wikipedia.org/wiki/Trie) on the compressor, and
a simple lookup table on the decompresser.  Runtime should be strictly O(n) to
compress any n-sized file.

Our code worked wonderfully on small files, but as soon as we turned it to the
5MB [Brown Corpus](http://en.wikipedia.org/wiki/Brown_Corpus), after a few
minutes it had only chewed through 20% of the file, and it was getting slower
as it went. Definitely not O(n) behavior.

Every iteration, we were careful to only make one change to the data structure,
and one move in the data structure.

My partner thought that we should profile the program to find out where the bad
behavior is, but I didn't think that'd be necessary - we'd be able to find the
flaw pretty quickly just by looking through the code, right? - there were only
a few accesses to our data structures. We *must* have been doing something
wrong there.

Well, I tried looking, and he profiled the program. He *easily* got the answer
in seconds, and it wasn't something obvious just from looking at the code, at
all.

By running `java -Xprof Compressor < brown.txt` the built-in Java profiler was
invoked, which samples that stack every 10ms, to see which function it's in. He
found over 90% of computation time was spent inside `Vector.toString()`...

{% highlight java %}
boolean DEBUG = false;
private void log(String s) {
    if (DEBUG) {
        System.err.println(s);
    }
}

/* ...SNIP... */
log(myVector.toString()); //on every iteration
{% endhighlight %}

However, even though debugging was disabled, java was still evaluating
`myVector.toString()` *every iteration*. Of course, `toString()` has to
iterate through every value in our data structure. All this computation was
occurring, even though `log()` was effectively a no-op.

So, now I'm completely sold on two things:

- *Profilers.* Especially java's builtin profiler - could it be easier to profile
  your code? I don't think so. Just add the `-Xprof` flag.
- *[Lazy Evaluation](http://en.wikipedia.org/wiki/Lazy_evaluation).* Why
  compute data you're not going to do anything with?
