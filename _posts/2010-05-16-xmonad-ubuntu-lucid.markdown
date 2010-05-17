---
layout: post
title: Gnome+XMonad in Ubuntu 10.04 Lucid
description: How to run XMonad with the gnome-panel as a drop-in replacement for Metacity on Ubuntu 10.04 Lucid
categories:
- xmonad
- howto
---

XMonad is a tiling window manager for X11. I've only used it for a day, but I'm
addicted. I can't see myself going back to a non-tiling WM:

- I love not having to resize windows to put them next to each other.
- I love the extra screen space of not having window borders
- I love being able to run tons of programs on my small laptop screen, but
  still be able to see them all
- As a developer, I love that xmonad is small (just a thousand lines of
  Haskell), AND it's been run through a theorem prover!

However, you probably don't want to run xmonad as a top-level window manager.
If you run xmonad inside a gnome session, you get all the good stuff gnome
usually does for free.  Things like message notifications, wireless network
connectivity, graphical multiple monitor support, password-management, volume
control, printer support, power management, and device management. You could
set up all that independently of gnome (and people do), but I don't consider it
a good use of time.

Here's how to run XMonad as a drop-in replacement for gnome's default window
manager (Metacity):

1) Install XMonad. Open a terminal and enter

{% highlight sh %}
sudo apt-get install xmonad
{% endhighlight %}

2) Configure XMonad to interact happily with gnome. Make a file
`~/.xmonad/xmonad.hs`, and put in it:

{% highlight haskell %}
import XMonad
import XMonad.Config.Gnome

main = xmonad gnomeConfig
{% endhighlight %}

Compile this config file by typing `xmonad --recompile` at the terminal.

*This is the crucial step most guides leave out.*  If you don't do this, xmonad
will try and tile the two gnome panels, and then the nautilus desktop
application will steal full the whole screen, and you won't be able to switch
to your other programs, and you will swear a lot.

3) Tell gnome to use xmonad instead of metacity. At the terminal, enter:

{% highlight sh %}
gconftool-2 -s /desktop/gnome/session/required_components/windowmanager xmonad --type string
{% endhighlight %}

And you're done! Logout, and log back in. The gnome-panel will happily coexist
with the tiling window manager.
