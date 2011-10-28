---
layout: post
description: "The fish shell sucks, because it's incompatible, but it's just compelling enough to use. Here's why."
title: Fish sucks (but your shell sucks more)
categories:
- rants
---

[Fish (the Friendly Interactive SHell)](http://www.fishshell.com) sucks.
They had a chance to create a world-changing command-line shell, but they
blew it.

Fish is completely incompatible with the traditional bash/zsh script syntax,
making it difficult to transfer skills from other shells.  Fish has thrown out
all that old syntax. This would be understandable, because the bash/zsh style
shell scripting languages are horribly unintuitive, arcane, and generally crap.
But fish replaced their syntax with something equally obtuse and useless - just
different. Check it out:

- I have to relearn how to do redirection - by using the `^` instead of `2>`. 
  Thanks for changing that.

- They've changed `foo && bar` to `foo; and bar`, `$?` to `$status`, `$#` to
  `$argv`. Presumably just to break my scripts and make me relearn everything.

- Fish won't work as vim's shell, because fish doesn't do redirection with the
  `< (command)` syntax. Great, using the same shell inside my editor would be
  way too convenient.

- Backtick expansion? They replaced it with bracket expansion. It works exactly
  the same way, but it has a different character, so it's totally incompatible
  with the other shells. You can't copy-paste directions you found on the
  internet. For me, it means I can't steal from my colleague's massive library
  of bash scripts to automate my job.

- There's no `!!` syntax to repeat the last command you typed, so you can't do
  `sudo !!` to repeat your last command when you forgot to sudo it.

- When I'm browsing a path on a slow-ass NFS connection, it slows down my
  typing to a crawl while it does a network roundtrip ls'ing the directory
  every damn time I press a key.


## Why use Fish if it sucks so much?

Mostly because I'm *pissed off* about the complete stagnation of and
lack of innovation in all the other shells.

It's 2010. 

*Every* shell should have syntax highlighting. 

*Every* shell should have quote matching

*Every* shell should have parenthesis matching.

The shell is one of the places where you'll spend most of your time as a coder,
and it's about time it had the usability we've come to expect of our other
software.

### Intelligent Defaults


Check out this quote from the fish website:

>    Configurability is the root of all evil
>
>    Every configuration option in a program is a place where the program is too
>    stupid to figure out for itself what the user really wants, and should be
>    considered a failure of both the program and the programmer who
>    implemented it.

YES. Intelligent defaults! These guys get it!

I shouldn't have to go through a half-hour customization course when I install
my shell (looking at you, zsh). I don't care where the command history
file is stored. My disk has gigabytes of space - I don't care how many log
entries you store! Just make it work! Fish just makes it work (and as a bonus,
it even merges command histories between different concurrent shells)!

Another thing fish gets right: using colour in the prompt. Fish gives you a
green prompt, so it can be distinguished easily from other command-line output.
When you're running as root in fish, your prompt is red, to remind me that
running as root is DANGEROUS. Nice.

If I want this in bash or zsh, I have to put arcane VT100 escape commands
in my `~/.bashrc` (or is it my `~/.profile`? or my `~/.bash_profile`? I don't
know, and judging by the mailing lists, even the bash devs don't know for sure) 

Tab completion is on by default in fish. And not just your ordinary 'press tab
twice and it'll maybe show you a list of files' tab completion - application
specific tab completion. Every shell should have smart tab-completion turned on
by default. In case I want to type a tab? Why would I ever type a tab in my
command line? It's not a useful character for anything else.

Here's some examples of the fish's smart tab completion:

- You can type `ssh l<TAB>` and have it expand to `ssh linode`.

- You can type `apt-get install libvlc-<TAB>` and have it expand to show you
  all the VLC library versions you can install, right there in the command
  line.

- You can type `git checkout <TAB>` and have it list and label all your git
  branches, files, and remote branches, right there in the command line. 

- You can type `ssh -<TAB>` and be reminded of all the command-line options of
  `ssh(1)`.

Zsh probably has most of this tab completion, but you have to manually turn it
on. That's *ridiculous*.  Nobody types f'real tab characters into their shell.
If users don't want tab completion, they can just not press tab. Sorted!

### Syntax Highlighting

Would you ever use an editor without syntax highlighting? Of course not! Why,
then, do you use a shell without syntax highlighting? 

Syntax highlighting is an absolute no-brainer, and fish gets it so right.

Fish instantly highlights valid commands in green, and invalid commands in red.
Quoted bits are colored yellow.

<pre>
mark@mt <font color='green'>~</font>> <font color='green'>echo</font> <font color='brown'>'GET /'</font> > request
</pre>

You don't have to run the command before to see if you've misspelled something.
If you misspell 'echo' or leave off a quote, fish highlights the offending area
red: 
<pre>
mark@mt <font color='green'>~</font>> <font color='red'>ehco</font> <font color='brown'>'GET /'</font> > request
</pre>

<pre>
mark@mt <font color='green'>~</font>> <font color='red'>ehco</font> <font color='red'>'GET / > request</font>
</pre>

Metacharacters are highlighted blue, so you know they have an effect before
they clobber your command. They're only highlighted when they're inside double
quotes, not single quotes where they have no effect. I can never remember which
quotes do what, so it's great to have this instant feedback.

<pre>
mark@mt <font color='green'>~</font>> <font color='red'>echo</font> <font color='red'>"GET <font color='blue'>$</font>path" > request</font>
</pre>

Valid file names are instantly underlined while I type, so I know the
second I make an error, and I can backspace and fix it there, instead of
running the command getting an error like 

    long/ass/filename/thats/ten/directories/deep/ - invalid directory 

and having to backtrack through a long filename to find where the spelling
mistake was. Fish lets me know the instant I press the key whether what I'm
typing is a valid filename, or something else. 

By far, this is my favorite feature of fish.

### Directory browsing

Press Alt-Left to go back a directory, and Alt-Right to go forward a directory.
It's exactly like the back and forward buttons in webpages. *Brilliant.*

No more of this  `cd ../../../../oh_crap_how_many_levels_up_am_i` crap to get
out of deeply nested directories.

I can hear some of you screaming about how your shell has `pushd` and `popd`
commands - I don't care. Let's be honest, you're never going to type a
6-character `pushd` over a 2-character `cd`. Directorys should be added to the
history stack automatically, like in web browsers and phones.

For more timesaving, in fish you don't even need to type `cd`! Just keying the
name of the directory, it will highlight green as a valid command, and pressing
enter will `cd` into it.

### Decent help

For help pages, fish doesn't use `man`, (a help browser offering little more in
usability than a sheet of paper), it uses a text-mode browser. 

You know, a browser, with hyperlinks. Why doesn't every program's documentation
have hyperlinks?  Even Microsoft's caught onto the value of an HTML help
system.

## Conclusion

The lack of innovation in the shell space is very annoying. Incremental
improvements on old technologies are the way to go. Instant feedback rocks. I
wish *someone* would make a shell that didn't suck.  Till they do, I'll have to
use fish, because all the other shells suck so much more.

Thanks, fish, for trying.
