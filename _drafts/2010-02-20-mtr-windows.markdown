---
title: MTR on Windows
layout: post
published: false
---

I love MTR. It's what traceroute should be. Traceroute *blocks on each host*, 
querying them sequentially.  First it waits for the first host, then the second
host, then the third host.

MTR queries all hosts *in parallel*, so it's often an order of magnitude
faster, and therefore much more useful for diagnosing network connectivity.

Unfortunately for me, it's only available for \*nix, and it doesn't work under
Cygwin. Searching around, I found a windows port, WinMTR. But it hasn't been 
maintained since 2002, and it doesn't work on my Windows 7 box, even when run as
administrator.

I found PathPing, a Microsoft tool that apparently combines the functionality of 
ping and traceroute, just like mtr. While showing promise, PathPing doesn't do 
real-time monitoring, rather it silently collects data for five minutes then
spits out an average ping to each host. Which works, but prefer the real-time
stats of MTR.


