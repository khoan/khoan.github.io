---
layout: ../layouts/PostLayout.astro
title: Devise Authentication unscoped
publishDate: 2012-07-19
---


At Shop2 we do the Rails 3.2, Mongoid 2.4, and Devise 2.0. We found that Devise by default does not play nice with default scoping.

~~~ ruby
# Our User model with default_scope of active users,
# and a :vip scope
#
class User
  include Mongoid::Document

  field :status

  # now only active users can be authenticated
  default_scope where(status: 'active')

  scope :vip, where(status: 'vip')
end
~~~

So how would we authenticate VIPs?

Devise uses Warden::Strategies to authenticate, and loads back user from a session. This is how I plugged into Devise:


~~~ ruby
# lib/vip_authenticatable.rb
#
# We introduce :vip_authenticatable strategy to Warden.
# With this strategy your login form might look something like
#
# <form action="/path/to/create/session">
#   <input name="vip[:id]" placeholder="Enter your VIP No.">
#   <input type="submit">
# </form>
#
Warden::Strategies.add(:vip_authenticatable) do
  def valid?
    params[:vip] && params[:vip][:id]
  end

  def authenticate!
    vip = User.vip.find(params[:vip][:id])

    if vip
      success! vip
    elsif !halted?
      fail! :invalid
    end
  end
end

# config/initializers/devise.rb
#
# We now ask Warden to use :vip_authenticatable when authenticating.
#
# Also, we instruct Warden to load User from session without any default scoping.
#
Devise.setup do |config|
  config.warden do |manager|
    require Rails.root+'lib/vip_authenticable'
    manager
      .default_strategies(scope: :user)
        .unshift(:vip_authenticatable)

    manager.serialize_from_session do |keys|
      klass, *args = keys
      user = ActiveSupport::Inflector
        .constantize(klass).unscoped
          .serialize_from_session(*args)
    end
  end
end
~~~

And there you have it folks: VIP login.
