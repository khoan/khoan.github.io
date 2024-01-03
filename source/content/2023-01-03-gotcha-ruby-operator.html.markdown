---
title: "gotcha: ruby []="
date: 2023-01-03 00:00 UTC
---

Another [wat](https://www.destroyallsoftware.com/talks/wat) moment with:

~~~ ruby
class Bam
  def []=(key, value)
    "bam"
  end
end
~~~

~~~ruby
irb> # I'm expecting "bam" to be the return value
irb> Bam.new[:ham] = :bacon
# => :bacon
~~~


~~~ruby
irb> # But this works as expected
irb> Bam.new.public_send(:[]=, :ham, :bacon)
# => "bam"
~~~
