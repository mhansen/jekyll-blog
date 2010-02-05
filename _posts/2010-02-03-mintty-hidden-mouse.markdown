---
layout: post
title: Mouse Hiding in MinTTY
---

I love [MinTTY](http://code.google.com/p/mintty/) - it's the best terminal
emulator I know of for Windows.  It's so very much better than the default
cmd.exe window that Cygwin uses by default, which you can't resize, and has
almost no scrollback.

But I've been having an intermittent problem with it - my mouse cursor keeps
disappearing. I move my mouse, hoping to find it, but it's invisible until I
click somewhere (and I can't see where I'm clicking). It's panicing!

Today I did some tests - the problem occurs when you move the mouse outside the
MinTTY window, and then type. The mouse disappears, and doesn't reappear until
it moves back into the MinTTY window.

So I looked through the MinTTY source code to see what's causing this. That's
easy enough. It's open source, and hosted at Google Code.

{% highlight sh %}
svn checkout http://mintty.googlecode.com/svn/trunk/ mintty-read-only
{% endhighlight %}

The source code is rather small, for a program written in C. With a little help
from `grep` and `ctags` it was easy to find the bit concerning mouse input - in
[wininput.c](http://code.google.com/p/mintty/source/browse/trunk/wininput.c).

The mouse is hidden whenever a keypress notification arrives.  Keypress
notifications arrive when the mouse is both inside and outisde the window.  The
mouse is shown whenever a mouse click/release/move notification arrives.  Mouse
notifications are only delivered when the mouse is inside the window area.

So it seems the mouse can be hidden by a keypress event while it is outside the
window, but it won't reappear, even if you move the mouse, until it reenters
the window. Or you click onto another program.

There's a simple solution: check if the mouse is inside the window before
hiding it. I looked up a few Windows API calls, found the ones I needed were
`GetWindowRect()` and `GetCursorPos()`. I made the change, recompiled, tested,
and it works! 

I checked the edge cases (literal edge cases - the four window edges), and it
even works there: I was worried that moving from just inside the window to
outside wouldn't send a mouse-move notification to the window, but happily it
does.

So, here it is - my first submitted patch to an open-source project. It's not
much, but it's a start. :)

{% highlight c %}

static bool
mouse_inside_window() {
    RECT w; POINT m;
    GetWindowRect(wnd, &w);
    GetCursorPos(&m);
    return
        (w.left <= m.x && m.x < w.right) &&
        (w.top <= m.y && m.y < w.bottom);
}

void
hide_mouse()
{
  if (mouse_showing && mouse_inside_window()) {
    ShowCursor(false);
    mouse_showing = false;
  }
}

{% endhighlight %}

*EDIT*: The MinTTY maintainer Andy Koppe was [totally awesome helping with my
problem](http://code.google.com/p/mintty/issues/detail?id=160), but he can't
reproduce the problem at his end, and after I restarted my computer I can't
reproduce it either.

However, the problem has been troubling me for a few months, so I'm sure it
will be back. And when it does, I'll be ready. ;)
