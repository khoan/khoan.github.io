---
title: The Sidekiq of 8 processes on Heroku Performance Dyno
date: 2014-06-20 00:00 UTC
---

So...I had the honor of doing some data migration, which happens to be CPU, and memory intensive.

I called upon Heroku PX Dyno and the Sidekiq with the wrath of one process and 100 threads.

~~~ sh
# loading PX with one process and 100 threads
$ heroku run --size PX 'bundle exec sidekiq -e production -c 100'
~~~

But was left wanting for yet more power, and PX had some extra room left unexploited. I called upon the rustic shell scripting to load up 8 processes at 100 threads each to work around the ruby GIL.

~~~ sh
# loading PX with 8 processes at 100 threads
$ heroku run --size PX 'for i in {1..8}; do bundle exec sidekiq -e production -c 100 & done'
~~~

But this is an intensive task, yet it relies on some flaky connection to be maintained. I called upon the one-off PX dyno to run in background.

~~~ sh
# loading PX with 8 processes at 100 threads on one-off PX dyno in background
$ heroku run:detached --size PX 'for i in {1..8}; do bundle exec sidekiq -e production -c 100 & done'
~~~

Wow, it finished so fast on such intensive task! Turns out, I had forgotten to tell main process to wait for all its sidekiq children to finish.

~~~ sh
# loading PX with 8 processes at 100 threads on one-off PX dyno in background
# and wait for the children to finish
$ heroku run:detached --size PX 'for i in {1..8}; do bundle exec sidekiq -e production -c 100 & done; wait'
~~~

Ah...nice, now just chuck those into a script for convenience and write up this post of course.

I call upon Heroku PX Dyno and the Sidekiq with the wrath of 8 processes at 100 threads.

> PROCESS=8 THREAD=100 bin/migrate_data.sh

All my code are belong to you.

Heroku rocks! Sidekiq rocks! Shell rocks!
