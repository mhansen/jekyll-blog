---
title: Automatically Compiling Haml in Vim
layout: post
description: My vim and python script for automatically compiling haml every time I save a haml file in vim.
categories:
    - vim
    - haml
---
I don't write a lot of straight HTML any more - I prefer the rapid prototyping
you can do with the likes of Haml, without having to worry about always
matching your start and end tags. 

However, the main disadvantage of haml is that it needs to be compiled to HTML.
This is an extra step in development that slows down iteration.

Previously I used a [watchr][watchr] script, spinning up a process that watches
for new haml files and automatically compiles them. This isn't as seamless as
I'd like, because I have to remember to spin up this process every time I want
to write some haml. Also, watchr won't pick up new files without a restart.

But I don't want to auto compile every haml file. My rails or jekyll templates
are supposed to be substituted into templates, not rendered as-is. I want a
way to opt in to auto-compilation, preferably only once per directory.

To opt-in, my script checks if a file named ".autohaml" exists in the current
directory. Create a file named ".autohaml" to opt in.

I've added this autocompile code to my vimrc. I've tried to use the minimum of
vimscript possible, doing most of the logic using python.

{% highlight vim %}
" Auto compile .haml files on save, but only
" if there's a .autocompilehaml file in the cwd.
" Depends on a `haml` executable. `sudo gem install haml`

au BufWritePost *.haml call HamlMake()

function! HamlMake()
    py << ENDOFPYTHON
import os
import vim

in_file = vim.current.buffer.name
dirname = os.path.dirname(in_file)
if os.path.exists(dirname + "/.autohaml"):
    out_file = in_file[0:-5] + ".html"
    os.system("haml %s > %s" % (in_file, out_file))

ENDOFPYTHON
endfunction
{% endhighlight %}


[watchr]: https://github.com/mynyml/watchr
