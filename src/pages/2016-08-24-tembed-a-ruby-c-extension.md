---
layout: ../layouts/PostLayout.astro
title: Meet Tembed a Ruby C extension
publishDate: 2016-08-24
---

Alright, so you're testing fancy fonts in the lovely browsers, then bam IE keeps spewing *installable embedding not allowed* and fonts are broken. But the Google God points to [Andre Backlund fontfixer](https://www.andrebacklund.com/fontfixer.html).

Hallelujah! One font fixed, only a few more to go. * squint * ha, I grab source [Tom 7's embed](http://carnage-melon.tom7.org/embed/).

Jesus! It's C code. What do? Created Tom embed [Tembed](https://github.com/issueapp/tembed) gem.

~~~ ruby
# Gemfile
...
gem 'tembed', github: 'issueapp/tembed'
...
~~~

And on irb

~~~ ruby
irb> Tembed.call '/path/to/font.ttf'
~~~

**Caveat:** if you get sued because you didn't have font license from author, then get a good lawyer.
