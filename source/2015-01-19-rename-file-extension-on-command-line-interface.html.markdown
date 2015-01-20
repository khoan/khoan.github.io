---
title: Rename file extension on command line interface
date: 2015-01-19 01:04 UTC
---

Since I have never taken the time to learn a "modern" integrated development environment (IDE) tool, I do most of my work on the command line. As a side effect, I can be productive on any environment that has command line interface.

Here're two ways to rename the extension of a batch of files via command line.

one liner

~~~ bash
find app/views -name '*.phtml' -exec sh -c 'mv "$0" "${0%.phtml}.html.php"' {} \;
~~~

or good old for loop

~~~ bash
for file in `find app/views -name *phtml`
do
  mv "$file" "${file%.phtml}.html.php"
done
~~~
