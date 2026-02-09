---
title: nginx pow coexistence
publishDate: 2014-07-09
---

I am a user of

> [Pow](http://pow.cx), is a zero-config Rack server for Mac OS X...serving your apps locally in under a minute

and

> [nginx](http://nginx.org), [engine x] is an HTTP and reverse proxy server

Now, pow is good for rack app but nothing else. But if nginx sits in front of pow, then awesome stuff happens. Here is the gist of it.

1. configure nginx so that *.dev is passed to pow
1. sudo launchctl unload -w /Library/LaunchDaemons/cx.pow.firewall.plist
1. sudo launchctl load -w /Library/LaunchDaemons/nginx.plist

Now, you can have SSL, or play with php development along with rack apps. Profit!
