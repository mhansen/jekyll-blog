---
layout: post
title: "Paper Review: Berkeley DB"
description: A review of the 1999 Berkeley DB paper.
categories:
- papers
- databases
---

*In this post, I read the [1999 Berkeley DB USENIX paper][bdb].*

Berkeley DB as a tiny (175KB) embedded key-value filesystem-backed database.

I first came across Berkeley DB in [Google’s Chubby paper][chubby]. It caught
my attention: the first iteration of Chubby used Berkeley DB as the backing
database. Chubby is Google’s high-reliability database for cluster
configuration, DNS, and master election. The authors must have had high
opinions of Berkeley DB to choose it as the basis of this high-reliability core
of Google's datacenter platform.

Berkeley DB lets you associate byte-string keys to byte-string values, with no
practical limits on the size of these keys or values. You can get, set, loop
over all the keys, or loop over a sorted range of the keys. The database is
backed by a single file.

Over the years, opt-in support has been added for concurrency, write-ahead
logging, and transactions. These are zero-cost abstractions - if you don’t use
them, you don’t have to pay for them.

### No new techniques
This paper’s interesting in that it presents no novel engineering techniques.
It just brings together old ideas into an attractive package, tied together
with good engineering:

>  There is nothing in the design or implementation of Berkeley DB that pushes
  the state of the art in database systems. Rather, we have been very careful
  to get the engineering right.

I respect this: getting from an idea in a paper to a reliable easy-to-deploy
system can very difficult. I enjoy reading papers where the authors talk about
engineering tradeoffs. According to the authors:

> The result is a system that is superior, as an embedded database system, to any other solution available.

It’s a big call, but as far as I know it’s fair - at least for their time. The
only other embedded database I’ve heard of with this feature level is SQLite: a
file-backed relational database that’s also embeddable as a single C header.
SQLite was released August 2000, a year after this Berkeley DB paper was
published.

### Access Methods
Berkeley DB is really three kinds of database under the hood: *Hash*, *B+Tree*,
and *Recno*. When creating a new database you choose one to use.

#### Hash
Hash databases are [linear hashtables][linear], with a user-defined hash
function. You can get and set by key, and iterate over all records in an
unspecified order.

Linear hashtables are a good choice to keep latency low and predictable -
linear hashtables do a small amount of work often, only splitting one
hashbucket at a time.  Compare with [extendible hashing][extendible], which
doubles the size of the array on overflow and redistributes all items in the
hashtable infrequently every log n insertions. On overflow, linear hashing has
a more predictable query time. I imagine this is important for embedded
databases.

#### B+Tree
B+Tree databases take a comparator instead of a hash function, and in addition
to getting and setting by key, you can iterate over these trees in order. You
can also iterate over a range of the keyspace.

#### Recno
Recno databases automatically assign record numbers (starting at 1) to records
for use as the key. Under the hood, these are stored as B+ Trees. Berkeley DB
automatically renumbers later records when things are added before them. This
seems designed to allow text editors fast access and insertion by line.

### On Disk Format
The database is divided into pages, which are divided into records. Pages are
locked during concurrent access and transactions. There’s no record-level
locking, but you can choose the page size to control how many records fit into
a page. In effect, this lets you tune the locking concurrency.

As usual for databases, you can enable a write-ahead log and flush all writes
to the log, to be able to recreate the database if there’s an outage in the
middle.

### Testing
> The software also includes a complete test suite, written
in Tcl. We believe that the test suite is a key advantage
of Berkeley DB over comparable systems.
>
> First, the test suite allows users who download and
build the software to be sure that it is operating correctly.
>
> Second, the test suite allows us, like other commercial
developers of database software, to exercise the system
thoroughly at every release. When we learn of new
bugs, we add them to the test suite. We run the test
suite continually during development cycles, and
always prior to release. The result is a much more reliable
system by the time it reaches beta release.

It’s very quaint to hear the authors talking about automated test suites, and
especially how this was a key advantage for them. Compare this with SQLite’s
testing page today, where they brag about having 811 times as much test code
and test scripts as database code. It’s hard to imagine a database product
without an automated test suite in 2016, but you get the feeling this was
cutting edge stuff in 1999.

[bdb]: http://static.usenix.org/event/usenix99/full_papers/olson/olson.pdf
[chubby]: http://research.google.com/archive/chubby.html
[linear]: https://en.wikipedia.org/wiki/Linear_hashing
[extendible]: https://en.wikipedia.org/wiki/Extendible_hashing
