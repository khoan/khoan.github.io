---
title: ruby defined? operator
date: 2012-08-23 00:00 UTC
tags:
---

Run this on ruby 1.9

~~~ ruby
require 'delegate'

class Bam < SimpleDelegator
  def bam
    defined? Bam
  end

  def rails
    defined? Rails
  end
end

module Rails; end

bam = Bam.new(Object.new)

# I'm expecting "constant" to be returned but it's something else in fact.
# Can defined? operator be used inside SimpleDelegator?
bam.bam
# => nil
bam.rails
# => nil

# wtf moment
defined? Bam
# => "constant"
defined? Rails
# => "constant"
~~~

Something is up inside SimpleDelegator...

~~~ ruby
class Normal
  def bam
    defined? Normal
  end
end

Normal.new.bam
# => "constant"
~~~

> Mon_Ouie: Module#const_defined?
>
> Mon_Ouie: You can also just explicitly start from top-level using ::SomeConstant

Thanks Mon_Ouie on IRC#ruby-lang. Ok, let's try that again...

~~~ ruby
class Bam < SimpleDelegator
  def bam
    defined? ::Bam
  end

  def rails
    Module.const_defined? :Rails
  end
end

bam = Bam.new(Object.new)

bam.bam
# => "constant"

bam.rails
# => true
~~~

hectic, turns out BasicObject is outside of the namespace of the standard library
see http://www.ruby-doc.org/core-1.9.3/BasicObject.html
