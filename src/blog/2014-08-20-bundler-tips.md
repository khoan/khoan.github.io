---
title: Bundler tips
publishDate: 2014-08-20
---

~~~ sh
$ bundle
Fetching source index from http://rubygems.org/
Fetching source index from https://rubygems.org/
~~~

time for coffee break...but then I found this tip on [bundler FAQ](http://bundler.io/v1.7/faq.html)

~~~ sh
$ bundle install --full-index
~~~

How much faster is it? Your mileage may vary.
