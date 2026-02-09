---
title: "gotcha: ruby []="
publishDate: 2023-01-03
---

Another [wat](https://www.destroyallsoftware.com/talks/wat) moment with:

```ruby
class Bam
  def []=(key, value)
    "bam"
  end
end
```

```sh
irb> # I'm expecting "bam" to be the return value
irb> Bam.new[:ham] = :bacon
# => :bacon
```


```sh
irb> # But this works as expected
irb> Bam.new.public_send(:[]=, :ham, :bacon)
# => "bam"
```
