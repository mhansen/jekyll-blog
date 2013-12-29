---
layout: post
title: iPhone as Numberpad
description: 
categories:
    - projects
---

I made a [simple HTML5 iPhone app that displays a numeric keypad](http://github.com/mhansen/ipod-numeric-keypad). 

![Numberpad next to laptop](/images/ipod-numberpad.jpg)

My laptop doesn't have a numberpad, and I needed one for some of
[Blender](http://www.blender.org)'s keyboard shortcuts. I was about to buy a
USB numeric keypad, when I thought: If I call myself a programmer, I *should*
be able to make a numeric keypad. Screw paying for one! So I made one.

When you touch one of the keys, it POSTs the key to a
[Sinatra](http://www.sinatrarb.com/)
server on my laptop, where
[xdotool](http://www.semicomplete.com/projects/xdotool/) sends the X11 event
for the keypress to the active window.

There's no force feedback, so this wouldn't do for serious data entry. But for
triggering simple keyboard shortcuts, this works perfectly.

### Thoughts:

- I'm really grateful someone wrote xdotool so I don't have to get my hands
  dirty with the X11 C++ API.

- I love Sinatra. It's never been so easy to make a webapp, especially simple
  'glue' applications like this one. It really is a superbly simple framework,
  and it gets right out of your way. The whole serverside code was less than 50
  lines, most of which my validation of keycodes:

{% highlight rb %}
#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'

configure do
    # make haml compile to html5 
    set :haml, :format => :html5
end

get '/' do
    # compile views/index.haml 
    haml :index
end

post '/press/:key' do
    # get the keycode for the numberpad key
    keysym = keysyms[params[:key]]
    # invoke xdotool to send the keypress to the active window
    system("xdotool key #{keysym}") if keysym
end

# keycode reference is at /usr/include/X11/keysymdef.h
# all of these are keypad events, so they start with 'KP_'
keysyms = {
    'zero' => 'KP_0',
    'one' => 'KP_1',
    'two' => 'KP_2',
    'three' => 'KP_3',
    'four' => 'KP_4',
    'five' => 'KP_5',
    'six' => 'KP_6',
    'seven' => 'KP_7',
    'eight' => 'KP_8',
    'nine' => 'KP_9',

    'multiply' => 'KP_Multiply',
    'divide' => 'KP_Divide',
    'add' => 'KP_Add',
    'subtract' => 'KP_Subtract',

    'decimal' => 'KP_Decimal',
    'enter' => 'KP_Enter'
}
{% endhighlight %}

- [Haml](http://haml-lang.com) is excellent. It took 15 minutes to learn, and
  it made it so much faster to prototype new layout ideas. It was tricky to get
  the calculator aligned properly, but Haml made it easy to move bits of layout
  around, and change CSS classes:

      !!! 5
      %html
        %head
          %meta(charset='utf-8')
          %meta(name='viewport' content='width=320; height=480; user-scalable=0;')
          %title Numpad
          %link(rel='stylesheet' href='/site.css' type='text/css' media='screen' title='default style sheet')
        %body
          #content
            .row
              .nothing &nbsp;
              #divide /
              #multiply *
              #subtract -
            .row
              #seven 7
              #eight 8
              #nine 9
              #add.tall +
            .row
              #four 4
              #five 5
              #six 6
            .row
              #one 1
              #two 2
              #three 3
              #enter.tall ↵
            .row
              #zero.wide 0
              #decimal .
          %script(src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js')
          %script(src='site.js')

  Adding a class was a simple matter of adding a '.classname' to the element.
  Removing an element, I didn't have to find and remove its closing element - I
  just delete a line. The same goes for adding an element. It *feels* a lot
  nicer than HTML. I might redo this site in Haml sometime.

## Try It
If you're on an X11 system, and have a phone with a browser, head over to the [github page](http://github.com/mhansen/ipod-numeric-keypad) for installation instructions.
