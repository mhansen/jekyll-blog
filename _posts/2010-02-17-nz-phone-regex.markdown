---
title: NZ Phone Numbers
layout: post
description: I found a regular expression to match New Zealand phone numbers
categories:
- phone
---

Setting up a VoIP router today, I came across an interesting setting: 'Dial Plan 1'.

    (*xx|#xx|1xx|082210S0|[2-9]xxxxxx|0[3469]xxxxxxxS0|0800xxxxxxS0|00[1-9]x.S3|0[12578]x.S3|0900xxxxxxS0)

That looks suspiciously like a regular expression, matching New Zealand phone
numbers! Cool! Let's analyze it. I love a puzzle.

## Quick Regex Primer

- `[abc123]` matches any one of the symbols inside the bracket. Called a
  'character class'.
- `[1-9]` is the same as `[123456789]`.
- `(pattern1|pattern2|pattern3)` is the basic OR of regular expressions: match
  `pattern1` OR `pattern2` OR `pattern3`. So in this expression, it looks like
  there are about 10 different types of general phone numbers.
- In this regex flavor, it looks like `x` is used as a stand-in for any number:
  a shorter way of saying `[0-9]`.

## Splitting the Regex

- `*xx`  
  Usually, `*` in a regular expression means "match any number of the previous
  token". Here, `*` is the first token, so it can't mean that. I'm guessing
  that it literally means the `*` button on the phone, followed by two numbers.
- `#xx`  
  Hash, followed by two numbers.
- `1xx`  
  One, followed by two numbers. Example: _111_ (emergency services)
- `082210S0`  
  Probably my ISP's voicemail service. I wouldn't know: I forgot the PIN number
  shortly after signing up and haven't used voicemail since :)
- `[2-9]xxxxxx`  
  In New Zealand, a local number is dialed with 7 numbers. I never knew that 
  they weren't allowed to start with a 1. 
- `0[3469]xxxxxxxS0`  
  `0` is the national access code.
  If a number starts with `03`, `04`, `06`, or `09`, it is a national call.
  Notably absent is `07` the area code for where I live.
- `0800xxxxxxS0`  
  `0800` numbers are national freecall hotlines.
- `00[1-9]x.S3`  
  `00` is the international access code. It's strange that there's only one `x`
  here, as there will probably be many more numbers after the country code.
  e.g. to call the US, you need to dial `00` for international, `1` for US,
  then the seven-digit US phone number.
- `0[12578]x.S3`  
  Aha! Here are the other area codes. These are invalid numbers - these area
  codes don't exist in New Zealand, except for `07` - my area code, which is 
  and error if you use it for a local call. 
- `0900xxxxxxS0`  
  0900 numbers: They charge you by the minute to call them.

## Unsolved Mysteries

- What is the purpose of this regex?
- `S0` and `S3` suffixes at the end some regexes. What do they mean?
- What do `.` dots mean?
- Why is there nothing distinguishing the valid numbers from the invalid
  `0[12578]x.S3]` form?

This format is probably documented somewhere. This regex was found on a
_Linksys AG310 ADSL2+ Gateway with VoIP_. But I know from experience that
searching through a supplier's website for documentation is usually a 
horrible experience, so I think I'll let these mysteries lie. :)
