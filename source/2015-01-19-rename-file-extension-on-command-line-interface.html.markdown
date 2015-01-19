---
title: Rename file extension on command line interface
date: 2015-01-19 01:04 UTC
---

one liner

~~~ sh
find app/views -name '*.phtml' -exec sh -c 'mv "$0" "${0%.phtml}.html.php"' {} \;
~~~

or good old for loop

~~~ sh
for file in `find app/views -name *phtml`
do
  mv "$file" "${file%.phtml}.html.php"
done
~~~
