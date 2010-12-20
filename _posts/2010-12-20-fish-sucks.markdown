---
layout: post
description: "The fish shell sucks, because it's incompatible, but it's just compelling enough to use. Here's why."
title: Why the Fish Shell sucks (but I use it anyway)
categories:
- rants
---

Fish (the Friendly Interactive SHell) sucks. They had a chance to create a
world-changing command-line shell, and they blew it.

## Why fish sucks

Fish is completely incompatible with the traditional bash/zsh script syntax.
Fish has thrown out that old syntax. This would be understandable, because the
bash/zsh style shell scripting languages are horribly unintuitive, obtuse, and
complete crap for programming in. But fish replaced their syntax with something
equally obtuse and useless, just different. What does this mean? 

- I have to relearn how to do redirection - how is using the `^` instead of `>`
  an improvement?!?

- Why `foo; and bar` instead of `foo && bar`? Why `$status` instead of `$?`

- Fish won't work as vim's shell, because fish doesn't do redirection with the
  `< (command)` syntax. Great, using the same shell inside my editor would be
  way too convenient.

- Backtick expansion? They replaced it with bracket expansion. It works exactly
  the same, but it has a different character, so you can't copy-paste directions
  you found on the internet. And it means that you can't steal from your
  colleague's library of bash scrips to automate your job.

- There's no `!!` syntax to repeat the last command you typed, so you can't do
  `sudo !!` to repeat your last command when you forgot to sudo it.

- Fish isn't supported by RVM, because fish uses a crazy-ass shellscript syntax

When I'm browsing a path on a slow-ass NFS connection, it slows down my typing
to a crawl while it does a roundtrip reading the directory every damn time I
press a key.


## Why use Fish if it sucks so much?

Because I'm really pissed off about the complete stagnation and lack of
innovation in shells.

It's 2010, for god's sake, *every* shell should have syntax
highlighting. Every shell should have quote matching, and parenthesis
matching. The shell is one of the places where you'll spend most of your time
as a coder, and it's about fucking time someone gave the shell a hint of
usability.

### Intelligent Defaults

You shouldn't have to go through a half-hour customization course when you
install the software (looking at you, zsh). I don't care where the command
history file is stored. My disk has gigabytes of space - I don't give a crap
how many log entries you store! Just work!

Fish seems to understand this. Check out this quote from the fish website:

    Configurability is the root of all evil

    Every configuration option in a program is a place where the program is too
    stupid to figure out for itself what the user really wants, and should be
    considered a failiure of both the program and the programmer who
    implemented it.

YES. This is *exactly* what I want!

Every shell should use colors to make important bits stand out. By default,
fish gives you a green prompt, so it can be distinguished easily from other
command-line output.

If you want this in bash or zsh, you have to put arcane VT100 escape commands
in your .bashrc (or is it ~/.profile? or ~/.bash\_profile? I suspect the bash
devs don't even know for sure) 

When you're running as root in fish, your prompt is red, to remind me that
running as root is DANGEROUS. Nice.

Likewise, tab completion is on by default.  Every shell should have smart
tab-completion turned on by default (why the hell would I otherwise type a tab
in my command line?) 
- You should always be able to type `ssh l<TAB>` and have it expand to `ssh linode`. Fish does this.
- You should always be able to type `apt-get install libvlc-<TAB>` and have it expand to show you all the
library versions you can install, right there in the command line. Fish does this.
- You should always be able to type `git checkout <TAB>` and have it list and
  label all your git branches, files, and remote branches, right there in the
  command line. Fish does this.
- You should always be able to type `ssh -<TAB>` and be reminded of all the
  command-line options of `ssh(1)`.

Zsh probably has most of this tab completion, but you have to manually turn it
on. That's *fucked*.  It's not like tab's a useful thing to type into your
shell otherwise.  If users don't want tab completion, they can just not press
tab. Sorted.

### Syntax Highlighting

Would you ever use an editor without syntax highlighting? Then why would you
use a shell without it? Syntax highlighting is an absolute no-brainer, and fish
gets it so right.

Fish instantly highlights valid commands in green, and invalid commands in red.
Quoted bits are colored yellow.

<pre>
mark@mt <font color='green'>~</font>> <font color='green'>echo</font> <font color='yellow'>'GET /'</font> > request
</pre>

You don't have to run the command before to see if you've misspelled something.
If you misspell 'echo' or leave off a quote, fish highlights the offending area
red: 
<pre>
mark@mt <font color='green'>~</font>> <font color='red'>ehco</font> <font color='yellow'>'GET /'</font> > request
</pre>

<pre>
mark@mt <font color='green'>~</font>> <font color='red'>ehco</font> <font color='red'>'GET / > request</font>
</pre>

Metacharacters are highlighted blue, so you know they have an effect before
they clobber your command. They're only highlighted when they're inside double
quotes, not single quotes where they have no effect. I can never fucking
remember which quotes do what, it's great to have this instant feedback!

<pre>
mark@mt <font color='green'>~</font>> <font color='red'>echo</font> <font color='red'>"GET /<font color='blue'>$</font>path" > request</font>
</pre>

Valid file names are instantly underlined while you type, so you know the
second you make an error, and you can backspace and fix it there, instead of running the command
getting an error like 

long/ass/filename/thats/ten/friggin/directories/deep/ - invalid directory

and having to backtrack through this long-ass filename to find where the
spelling mistake was. Fish lets you know the instant you press the key whether
what you're typing is a valid filename, with its underline. This is by far my
favorite feature.

### Directory browsing

Press Alt-Left to go back a directory, and Alt-Right to go forward a directory.
It's exactly like the back and forward buttons in webpages. 

No more of this  `cd ../../../../../oh_crap_how_many_levels_up_was_it_again`
crap to get out of deeply nested directories.

To those screaming about `pushd` and `popd` commands - because let's be honest,
you're never going to type a 6-character `pushd` over a 2-character `cd`. Hell,
in fish you don't even need to type `cd`! Just keying the name of the
directory, it will highlight green as a valid command, and pressing enter will
`cd` into it.

### Decent help

Fish doesn't use `man` for help, it uses a text-mode browser. You know, with
hyperlinks. Why the hell doesn't every program's documentation have hyperlinks?
Goddamn, even Microsoft's caught onto the value of an HTML help system.

## Conclusion

God damn, you'd think SOMEONE would make a shell that isn't unusable as FUCK.

Thanks, fish, for trying. But you're not trying hard enough
