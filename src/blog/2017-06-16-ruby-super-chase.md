---
title: Chasing after super in your favorite Ruby lib
publishDate: 2017-06-16
---

Let's explore Rails 4.1 action view abit, in particular stylesheet_link_tag helper:

```sh
irb> av = ActionView::Base.new(nil, {}, nil)
irb> av.method(:stylesheet_link_tag).owner
# => Sprockets::Rails::Helper
irb> av.method(:stylesheet_link_tag).source_location
# => ["/path/to/gems/sprockets-rails-2.2.4/lib/sprockets/rails/helper.rb", 155]
```

Let's open up /path/to/gems/sprockets-rails-2.2.4/lib/sprockets/rails/helper.rb at stylesheet_link_tag method:

```ruby
def stylesheet_link_tag(*sources)
  # blah blah
        super(source, options)
  # blah blah
    super(*sources)
  # blah blah
end
```

Where is this magical super?

```sh
irb> av.method(:stylesheet_link_tag).super_method.owner
# => ActionView::Helpers::AssetTagHelper
irb> av.method(:stylesheet_link_tag).super_method.source_location
# => ["/path/to/gems/actionview-4.1.9/lib/action_view/helpers/asset_tag_helper.rb", 92]
```

Let's open up /path/to/gems/actionview-4.1.9/lib/action_view/helpers/asset_tag_helper.rb at stylesheet_link_tag method:

```ruby
def stylesheet_link_tag(*sources)
  # blah blah
end
```

Nothing super magical here; end of the line.

```sh
irb> av.method(:stylesheet_link_tag).super_method.super_method
# => nil
```
