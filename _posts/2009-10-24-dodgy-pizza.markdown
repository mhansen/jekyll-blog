---
layout: post
title: Dodgy Pizza
description: Hell's Pizza doesn't have good website security for credit card numbers
categories:
    - security
---

With some friends last night, I got some pizza. As the pizza delivery boy
answered the door, he asked to see the credit card we had used to order the
pizza, remarking "We have had 70 cases of credit card fraud". This, from a
store that just opened two weeks ago, is crazy. There must be a reason why
Hells Pizza is getting so much fraud!

Quick! What's wrong with this picture?

[![Hells Pizza asking for credit card number on unsecured page](/images/hells.png)](http://www.hell.co.nz)

Here's a clue:

![Google chrome website information](/images/chromeinfo.png)

See that link "Click here to verify merchant details"? Here's what happens when
I click it:

![Invalid website](/images/paymark.png)

Hells Pizza's website:

* Uses unsecured HTTP (plaintext transmission!)
* Has no certificate to ensure I'm actually at the real hells pizza website
* Has a link to a validation website telling me their website is invalid.

These are *serious problems* for a company taking their customer's credit card
number over the internet.

Unsecured HTTP
--------------

This means everything is transmitted in plain text. Anyone on the connection
between my computer and hell.co.nz can watch it, inspect it, or even change it.
If they're transmitting my credit card number like this, it's also against
VISA's terms and conditions.

No certificate
--------------

Certificates say "A trusted authority has vouched that this is indeed the real
website of hell.co.nz, and not some imposter". Since there is no certificate, I
have no way of knowing that I'm looking at the real Hells Pizza website! 
It could be running off a completely different server, anywhere in the world
and I'd have no idea that I was actually giving my credit card number to
someone in, say, Nigeria.

Sounds farfetched? There are many ways I could be redirected to a different server:

* It's being transmitted over unsecured HTTP, so anyone between my computer and 
  hell's pizza's server could intercept the communication, reply as if they
  were hell's server, and issue a redirect request to their server.
* DNS cache poisoning. Any of your DNS caches could be poisoned to redirect 
  www.hell.co.nz to a fake host. Your browser, your operating system, your
  router, and your ISP all operate their own DNS caches. Any of these could be
  poisoned.
* HOSTS file poisoning. Every time your computer visits a website, it checks the 
  hosts file. And if the hosts file says "hellspizza.co.nz is at this ip
  address", my request (and credit card number) will be sent to that ip
  address.
* Hell's Pizza forgets to renew their domain name, and someone else snaps it up.

Sniffing
--------

I popped open my favorite network sniffer
[Wireshark](http://www.wireshark.org) to have a closer look at the
network traffic leaving my computer, and whether it was encrypted when I sent
my credit card number.

The whole website is done as a Flash application, and internally, the
application *does use HTTPS to transmit credit card numbers*. This means that
not I, nor anybody else on the network, can listen in on the credit card
numbers in transit.

Conclusion
----------

For now, there's no way for me to know if I'm dealing with the real Hell's
Pizza website when I'm entering my credit card details.

I know it's encrypting my credit card details before sending them, but *I can't
be sure who it's sending them to*. This is not good enough for a website
handling customer's credit card numbers.

Hell's Pizza needs to: 

* serve up their content using 
  [Secure HTTP](http://en.wikipedia.org/wiki/HTTPS),
  so that nobody can alter their website in the network.
* get a [certificate](http://www.verisign.com/) for their website, so that I 
  know I'm looking at the real Hell's Pizza website.
* Investigate why their paymark 'site validation' link tells me the site is Not
  Valid.

Till then, I know who I'll be ordering from:

![Dominos Pizza Certificate](/images/dominos.png)
