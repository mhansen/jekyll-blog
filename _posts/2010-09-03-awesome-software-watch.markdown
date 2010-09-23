---
layout: post
title: "Awesome Small Software: Watch"
description: "How watch changed my life, and how it will change yours too."
categories:
- awesome small software
---

I'm starting a small series where I do shout-outs to my favorite bits of
software - software that's just **awesome**. Software that will make
your life easier. Software that you want to know about.

As a political statement, I'll be focussing on small software. I particularly
like software that does one thing, and does it well. **I love small software.**
It's more maintainable, easier to understand, and more likely to be correct. 

Small software is inherently more flexible than large software, because it's
easier to understand the small software to the point where you can change it.

One of my favorite small pieces of software is `watch`.

## Ok... what does watch do?

In general, you need to run a bit of code, and you need it running often,
sometimes in the background while you're working. `watch` lets you run
arbitrary code, repeatedly every few seconds. `watch program` runs `program`
every 2 seconds, and displays the output.

## Give me some examples, man!

Sure thing!

You're working with javascript, and you're getting sick of syntax errors. It
seems every time you reopen your site, things just aren't working as you'd
expect.  you've missed a semicolon somewhere, or misspelled a function. Stupid
mistakes. And you've got to switch over to the browser console to find these
errors, then copy the line number back into your editor, navigate to the line,
and look through the line to try to spot your error.

If only there was some way to let me know immediately as soon as i made a
mistake! `watch` and `jslint` to the rescue!

{% highlight sh %}
# jslint knows when you make mistakes in javascript
watch jslint *.js
{% endhighlight %}

<hr>

Of couse, that last example was silly. You've got 100% coverage with your test
suite on all your code, because you've diligently practiced TDD. (right?)
Better to actually run your code, exercise it, and flush out the real bugs
along with the syntax errors. 

Doing this manually sucks - leaving your editor, running the tests, then coming
back to your editor takes valuable time. It'd be great if the tests could be
run continuously - then you'd catch bugs *as you make them*, and you won't have
to backtrack/search to find where the bug is.

{% highlight sh %}
watch runtests.rb
{% endhighlight %}

<hr>

You're working in a templating language (TeX, markdown, haml, whatever), and
there's this stupid error - you're not escaping some character somewhere, and
everything's been thrown off. You want to see the compiled output as you're
working on the file, so you know immediately when you've fixed the problem:

Of course, you could edit, exit your editor, recompile the document, open the
result, see what's changed, then switch back to your editor, clean up some
more, exit your editor, recompile again, open the result again, see that it's
still not fixed... 

But you don't hate yourself: you want to shorten this whole write-compile-debug
loop. So you open up a terminal next to your editor, firing up your good friend
`watch`:

{% highlight sh %}
# continuously compile my markdown report and display the html
watch markdown COMP301_final_report.markdown
{% endhighlight %}

<hr>

You're waiting on this massive download of (completely legal, creative-commons
licensed) music. You want to know the second it appears finished in your
download folder: 

{% highlight sh %}
watch ls -l ~/Downloads
{% endhighlight %}

<hr>

You're on a shared box, and it's going dog-slow. What the hell are the other
users up to?

{% highlight sh %}
# programs that aren't mine, and aren't system
watch 'ps aux | grep -v mark | grep -v root'
{% endhighlight %}

<hr>

You're debugging an HTTP API, and you want to see the full response to a
request as you modify the backend. This is a DELETE method, and your browser
only supports GET and POST. Refreshing in-browser isn't going to cut it. This
would be better served as a unit test, but you're doing exploratory programming
and want to see the result of what you're doing in real time.

{% highlight sh %}
# keep on firing DELETE requests!
watch 'curl -X DELETE http://testserver.markhansen.co.nz/api/testpage'
{% endhighlight %}

<hr>

[1-day](http://1-day.co.nz) is running one of their crazy 'new items every few
minutes' sales, and you want to know immediately if rock band drum kits come on
sale, because you've been wanting to learn the drums for ages, but you've got
no room for a real drumkit. Whatever - the electronic version is way fun
anyway. You fire up `watch` the keep an eye on the site

{% highlight sh %}
# gimme them bargains!
watch 'curl www.1-day.co.nz | grep -i "rock band"'
{% endhighlight %}

<hr>

You keep tabbing around in your trusty IDE, (vim, naturally) but sometimes the
jump-to-function fails - your tag cache is stale! You're sick and tired of
exiting to the console and rebuilding to the taglist every time this happens,
so you fire up a background terminal and call on your trusty friend `watch` to
do it for you, every 2 seconds:

{% highlight sh %}
# ctags, work your magic analyzing my code!
watch ctags my_code_directory -R
{% endhighlight %}

<hr>

## Conclusion

It's really useful to get (almost) real time status updates on almost
anything. I use it whenever there's a long write-compile-debug cycle where the
recompiling could be automated.

It really shines with interpreted languages, where there's no compile wait and
you get almost instant feedback, running your tests continuously.

The default setting for `watch` is to check your command every 2 seconds, but
you can change this with the `-n` option.

{% highlight sh %}
# we have a lot of files, it's going to take a while to make the tags db
# give it 30 seconds
watch -n 30 ctags ~/awesomeproject/ -R
{% endhighlight %}

Just knowing `watch` exists, you're at a massive advantage whenever you need
some task repeated. I've found so many places where `watch` is a natural fit. I
bet you will too!
