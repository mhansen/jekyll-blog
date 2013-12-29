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

However, disadvantage of haml is that it needs to be compiled to HTML. This is
an extra step in development that slows down iteration.

Previously I used a [watchr][watchr] script, spinning up a process that watches
for changes to haml files and automatically recompiles them. This isn't as
seamless as I'd like, because I have to remember to spin up this process
every time I want to write some haml. Also, watchr won't pick up new files
without a restart.

I want some kind of auto compilation - but not for every haml file. For
example, my rails and jekyll partials are supposed to be substituted into
other templates, not rendered as-is.

I want a way to opt in to auto-compilation, preferably only once per directory. 
For this, my script checks if a file named ".autohaml" exists in the current
directory. Create a file named ".autohaml" in the directory to opt in.

I've added this autocompile code to my vimrc. I know python much better than
vimscript, so I've tried to put as much logic as possible into python.

{% highlight vim %}
" Auto compile .haml files on save, but only
" if there's a .autocompilehaml file in the cwd.
" This depends on there being a `haml` executable in your $PATH.

au BufWritePost *.haml call HamlMake()

function! HamlMake()
    py << ENDOFPYTHON
import os
import subprocess
import vim

in_file = vim.current.buffer.name
dirname = os.path.dirname(in_file)
if os.path.exists(os.path.dirname(in_file) + "/.autohaml"):
    out_file = in_file[0:-5] + ".html"
    subprocess.call(["haml", in_file, out_file])

ENDOFPYTHON
endfunction
{% endhighlight %}


[watchr]: https://github.com/mynyml/watchr
