---
layout: post
title: Virtualization is The Future
description: How virtualization saved my butt and fix my host quickly.
categories:
- virtualization
- administration
---

I love virtualization, because it saved my butt yesterday.

I upgraded my virtual server to the latest Ubuntu, restarting it to complete
the installation. It didn't come back up in a timely fashion in a few minutes,
and I started to worry. 

While I have backups of all the essential data on there, and I could get get it
back to a functioning state from a reinstall, it would suck to lose all my
configuration. I was also using the server as a backup for some of my data, and
having to reupload it all would take a long time.

But none of this was an issue, I was amazed to learn. 
Linode let me *pop a virtual recovery livecd into my virtual host*. This is
exactly what I'd do if a physical computer I own wouldn't boot! Except I
didn't have to physically be there (in Texas) to do it. I 
[booted into a recovery distribution](http://library.linode.com/troubleshooting/finnix-recovery), 
fixed the
[problem](http://blog.linode.com/2010/04/29/ubuntu-10-04-lts-lucid-lynx/)
in a few minutes, rebooting back into a newly working Ubuntu 10.04.

I did all this from the comfort of my couch, using linode's AJAX console. I
didn't need to call anyone, I definitely didn't need to drive to a data center,
and I was back up and running in minutes. 

Does your hosting provider let you do this, this easily?

Virtualization *rocks*. 

If I had this problem on a physical server, I'd be screwed. To pop in a liveCD,
I'd need to get someone at the data center to fix it, or drive down there
myself. Knowing murphy's law, this would happen in the middle of the night.

Virtualization is the future, because it **lets sysadmins sleep at night**.
