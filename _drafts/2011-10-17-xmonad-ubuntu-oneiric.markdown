---
layout: post
title: Unity+XMonad in Ubuntu 11.10 Oneiric
description: How to run XMonad with unity panels in Ubuntu Oneiric
categories:
- xmonad
- howto
---

I love XMonad. For years I've been using it inside Gnome 2, but with the
release of Ubuntu 11.10 Oneiric, Gnome 2 is on the way out, and Unity is the way
forward. Here's how to run XMonad with Unity-2D:

1) Install XMonad. Open a terminal and enter

{% highlight sh %}
sudo apt-get install xmonad
{% endhighlight %}

2) Configure XMonad to interact happily with unity. This
involves floating the laucher over the top of the active
window, and not trying to tile the top panel.

Make a file `~/.xmonad/xmonad.hs`, and put in it:

{% highlight haskell %}
import XMonad
import XMonad.Config.Gnome

myManageHook = composeAll (
    [ manageHook gnomeConfig
    , className =? "Unity-2d-panel" --> doIgnore
    , className =? "Unity-2d-launcher" --> doFloat
    ])

main = xmonad gnomeConfig { manageHook = myManageHook }
{% endhighlight %}

3) Compile this config file in the terminal

{% highlight sh %}
xmonad --recompile
{% endhighlight %}

4) Tie it all together with an alternative "XMonad Unity" XSession.

Make a file `/usr/share/gnome-session/sessions/xmonad.session` with these lines:

{% highlight ini %}
[GNOME Session]
Name=Xmonad Unity
RequiredComponents=gnome-settings-daemon;
RequiredProviders=windowmanager;panel;launcher;
DefaultProvider-windowmanager=xmonad
DefaultProvider-panel=unity-2d-panel
DefaultProvider-launcher=unity-2d-launcher
{% endhighlight %}

Make a file `/usr/share/xsessions/xmonad-unity-session.desktop` with these lines:

{% highlight ini %}
[Desktop Entry]
Name=XMonad Unity
Comment=Tiling window manager
TryExec=/usr/bin/gnome-session
Exec=gnome-session --session=xmonad
Type=XSession
{% endhighlight %}

And you're done! Logout, and log back in, selecting
the "XMonad Unity" session. The Unity panel and
launcher will happily coexist with XMonad. Choice!
