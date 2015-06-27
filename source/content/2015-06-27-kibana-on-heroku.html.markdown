---
title: Kibana 4.1 on Heroku
date: 2015-06-27 00:10 UTC
---

At [Issue](http://issueapp.com), we handle lots of data. When you have millions of data points, patterns emerge and valuable info can be gleaned and harnessed from your data.

We like ELK stack and Heroku. But before Kibana 4, you had to setup a web server, say nginx, to serve Kibana on Heroku. There are numerous nginx buildpack in the wild: [abhishekmunie](https://github.com/abhishekmunie/heroku-buildpack-nginx), [ryandotsmith](https://github.com/ryandotsmith/nginx-buildpack), etc. But no buildpacks for kibana as far as I am aware of. And I was too lazy to get something together.

Fast forward to Kibana 4, a node web server has been bundled together to serve Kibana app, and we needed to harness our data. So [issue/heroku-buildpack-kibana](https://github.com/issueapp/heroku-buildpack-kibana) is borned. Only catch is Kibana 4 requires Elasticsearch 1.4.4 or later. So if you're on Elasticsearch 1.4.4 or above, give the buildpack a go and put your data to work.
