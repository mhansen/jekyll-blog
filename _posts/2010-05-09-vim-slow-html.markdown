---
title: Vim slow startup opening HTML
description: Vim is taking ages to load a file. I debug the problem.
categories:
- vim
- regular expressions
---

Editing files earlier, I'd noticed it took *ages* to load a file into vim. The 
screen would display the filename at the bottom, wait for about 10 seconds 
(pegging the CPU at 100%), and then display the file. This only happened for
Markdown files, so I opened `markdown.vim`.

My first instinct was a runaway regular expression, backtracking all over the
code

{% highlight vim %}
syntax match  htmlH1       /^.\+\n=\+$/ contains=@Spell
syntax match  htmlH2       /^.\+\n-\+$/ contains=@Spell
{% endhighlight %}

These regular expressions match Markdown headings that look like

    Heading 1
    =========

    Heading 2
    ---------

I was concerned with the `.\+` part of the regular expression. `.` means 'match
any character' and `\+` means match as many of the previous identifier as
possible. `\+` matches grabs as many characters as possible - it is a *greedy*
operator. 

If you tell Vim to match as many of 'any character' as possible, it
will first match the whole document, then have to backtrack through the whole thing
to find a match for `\n=\+$` (a newline containing only `=` characters).

Turns out this wasn't a problem, because in vimscript, the 'match any
character' doesn't match newlines, so the regex only goes to the end of the
line.  This is exactly the behaviour you want for the markdown parser. This 
wasn't the code that was pegging my CPU at 100%.

Commenting out various lines of markdown.vim, I found the line causing the slow
loads: 

{% highlight vim %}
runtime! syntax/html.vim
{% endhighlight %}

There was a bug in the html syntax file that was causing this trouble. I tried
commenting out the VBScript part of the html syntax file (who embeds VBScript
in HTML any more?), and then the CSS section. Turning off CSS fixed the problem
right away.

The problem was this nifty little vimscript I downloaded a week ago to display CSS
color strings like "#e0f300" in the color they represent: [css_color.vim](http://www.vim.org/scripts/script.php?script_id=2150).

Removing this plugin bought me back to the happy world of sub-second startups. It's 
a shame, though, because `css_color.vim` seems really useful to visualise
colors as you're writing CSS. If someone could fix it up to not murder my
startup time, that'd be awesome!
