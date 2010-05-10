---
layout: post
title: Bad Benchmarks
description: "Benchmarking pitfalls: chrome vs firefox"
category:
- benchmarks
---

I saw someone ask today if 
[Chrome really is faster than Firefox](http://news.ycombinator.com/item?id=1334000). 
I've always felt that chrome was 'snappier' than Firefox, but I thought I'd run
a little (unscientific) test, to see if it really was.

I compared Chrome and Firefox for startup time: from launch (from the terminal)
till when the window appears and I click the close button.

<pre>
moon@Moon-Satellite ~> <b>time google-chrome</b>
0.56user 0.26system <b>0:03.03elapsed</b> 27%CPU (0avgtext+0avgdata 246176maxresident)k
2304inputs+112outputs (3major+32511minor)pagefaults 0swaps

moon@Moon-Satellite ~> <b>time firefox</b>
1.80user 0.18system <b>0:09.21elapsed</b> 21%CPU (0avgtext+0avgdata 206864maxresident)k
64648inputs+160outputs (233major+15989minor)pagefaults 0swaps
</pre>

Awesome! My little test had shown that Chrome started in 3 seconds, compared to
Firefox's 9 seconds. That's well outside the margin of error I give for between 
me seeing the window is open and closing it. **Hypothesis confirmed!**

*Not so fast.* I reran the tests, and the results were telling:

<pre>
moon@Moon-Satellite ~> <b>time google-chrome</b>
0.56user 0.21system <b>0:02.12elapsed</b> 36%CPU (0avgtext+0avgdata 240384maxresident)k
0inputs+216outputs (0major+42590minor)pagefaults 0swaps
moon@Moon-Satellite ~> <b>time firefox</b>
1.57user 0.12system <b>0:02.70elapsed</b> 62%CPU (0avgtext+0avgdata 199936maxresident)k
0inputs+112outputs (0major+15669minor)pagefaults 0swaps
</pre>

With a warm cache, Firefox manages to start in 2.70 seconds, and Chrome starts
even faster, at 2.12 seconds. **This is inconclusive** - the difference (half a
second) is probably within the time it would take me to notice the window had
popped up, and click the close button, telling `time` to stop the clock.

Of course, the first time you run firefox, the operating system has to go to
the disc to get the firefox application, and all its configuration. The next 
time you run it, the operating system has a cache of all that data in RAM.
You can access RAM at the speed of electricity (almost the speed of light).
You can access the hard disk at the speed it spins (about 50km/h). **Big
difference.**

When benchmarking, beware of confirmation bias, and cache effects (even when
the test is unscientific, and just for a bit of fun!).
