---
title: "gotcha: ruby += operator"
publishDate: 2012-08-07
---

Looks like there's no += operators. My guess is compiler is probably converting a += b expressions into a = a + b, or more verbosely a.send(:=, a.send(:+, b)).

Here's some quick experimentation:

~~~ ruby
irb> 0.send("+=", 1)
# => NoMethodError: undefined method `+=' for 0:Fixnum
irb> 0 += 1
# => SyntaxError: (irb):1: syntax error, unexpected tOP_ASGN, expecting $end
~~~
