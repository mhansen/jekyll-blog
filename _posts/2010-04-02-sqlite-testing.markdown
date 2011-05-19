---
layout: post
title: Extreme Testing
description: 
categories:
- testing
- sqlite
---

I hear [again](http://news.ycombinator.com/item?id=879181) and 
[again](http://www.reddit.com/r/programming/comments/26dyh/ask_reddit_whats_the_most_beautiful_piece_of/c26er9) 
that SQLite's source code is among the best to learn from - high praise. But I
had no idea how extreme their testing procedures are.

I have never heard of a project being this extensively tested.

From [How SQLite is Tested](http://www.sqlite.org/testing.html): 

SQLite has **100% branch test coverage** on over **67 thousand** source lines
of code, with **46 million** source lines of test cases.

That's **679 times as much** test code as production code. Wow.

And it doesn't stop there. SQLite has:

- Out-of-memory tests
- I/O error tests
- Crash/Power loss tests
- Fuzz tests for invalid input
- Boundary value tests
- Malformed database tests
- Memory usage tests (valgrind)

The article dives deep into the challenges of such extensive testing. For
example: How do you get 100% branch coverage when you have 'defensive code'
that should never be exercised? (the answer: leave the defensive code in, but
remove it with the preprocessor before testing.)

It's well worth a read: [Testing in SQLite](http://www.sqlite.org/testing.html).
