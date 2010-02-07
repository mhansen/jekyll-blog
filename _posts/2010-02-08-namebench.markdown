---
title: Benchmark your DNS!
layout: post
categories: 
 - DNS
---

Every time you browse to a website, your computer needs to translate the
human-readable URL (`www.google.com`) into an IP (`66.102.7.103`). It does
this by asking your DNS servers. The speed of your DNS server can really 
impact the speed of your internet browsing.

There's a lot of choices for DNS servers. Chances are you're just using your
ISP's one, and this may not be the fastest. I was using 
[my ISP](http://xnet.co.nz)'s DNS servers, and it turns out that on average
[another ISP](http://xtra.co.nz)'s DNS servers were over twice as fast -
from 258ms down to 112ms!

You can benchmark your DNS servers with
[namebench](http://code.google.com/p/namebench/), a free tool for Windows, Mac,
and UNIX. Namebench is smart - it pulls data from your browser history to ensure
your DNS is optimised for the sites you frequent. Namebench checks the best DNS
servers in your region, as well as global services like Google Public DNS,
OpenDNS, and UltraDNS. Namebench even checks for incorrect results from DNS
Servers!

I'm very impressed with how simple, smart and effective namebench is. Kudos to
the developers! Thanks for the 50% reduction in DNS wait times.
