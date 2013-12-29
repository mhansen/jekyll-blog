---
title: Your Language Influences your Thinking
layout: post
description: Language isn't just a passive medium of data transport, but rather an active shaper of thoughts and ideas.
categories:
- languages
---


There's a [great article over at the Wall Street Journal](http://online.wsj.com/article/SB10001424052748703467304575383131592767868.html) about how language
isn't a dumb, passive medium of data transport.  Rather, language actively
shapes our thoughts and ideas. It's a great article, 
[go read it](http://online.wsj.com/article/SB10001424052748703467304575383131592767868.html). I'll wait here.

<blockquote>
All this new research shows us that the languages we speak not only reflect or
express our thoughts, but also shape the very thoughts we wish to express. 

The structures that exist in our languages profoundly shape how we construct
reality.
</blockquote>

The same idea, expressed in different languages, is no longer the same idea.
Each language carries different connotations:

<blockquote>
English speakers tend to say things like "John broke the vase" even for
accidents. Speakers of Spanish or Japanese would be more likely to say "the
vase broke itself."
</blockquote>

Each language embeds different details in its grammar:

<blockquote>
In Turkish, you would have to include in the verb how you acquired this
information. For example, if you saw the chubby fellow on the wall with your
own eyes, you'd use one form of the verb, but if you had simply read or heard
about it, you'd use a different form. 
</blockquote>

These subtle differences shape your thinking - different languages emphasise
different aspects of the situation.

You can see the same thing with programming languages! Functional languages
like Haskell or Clojure favor verbs over nouns. Both these languages offer a
multitude of functions that act on a small number of basic noun types. 
Using a functional language, you're likely to approach a problem by thinking
about the functions needed - the data transformations, the procedures. The data
takes a back seat - the **act** is important, rather than the actor.

Other languages offer a more noun-based approach (e.g. Java, C#). These
languages offer first-class support for a large number of nouns (objects),
where the object is the first-class citizen. Functions are only valid in the
context of an object. Functions only exist as the children of objects. The 
**actor** is important, not the act.

Other languages offer a hybrid approach (e.g. JavaScript, Scala), offering a
more-or-less equal footing between verbs and nouns.  For example, Underscore.js
(a JavaScript library) 
[offers the same operations with your choice of noun-first or verb-first grammar](http://documentcloud.github.com/underscore/#styles). 
I love this choice - it lets me choose the way I approach a problem.  Some
problems seem predominantly noun-based (e.g. modelling and simulating), but
some problems seem more verb-based (e.g. dataflow, mathematics), and I get to choose the most readable 
approach for my domain.

It goes further than functional/object-oriented grammar differences. For
example Scheme programmers focus on building large solutions out of many
smaller problems. The whole language embodies this - Scheme only defines a
minimal set of primitives, and the rest of the language is built from combining
these primitives.

The good news: as developers, it's *easy* to gain access to these different
worldviews!  It's relatively easy for us to pick up a new language - A new way
of looking at the world. It's definitely a lot easier to learn a new computer
language than to learn a new human language.

Try something more exotic:

- *Prolog* - see problems in terms of logic!
- *Erlang* - gain a glimpse into their actor-based worldview. 
- *Clojure* - learn to live without changing any state. 
- *Haskell* - live without any nouns at all! (while, hopefully, still getting stuff done)

Any languages offering compellingly different worldviews that I left out? Leave a comment.
