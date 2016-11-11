---
title: Ruby FTP stream
date: 2016-11-11 03:31 UTC
---

Good ol' FTP that's how the web's done once. Naturally Ruby has an FTP stdlib. But if I download 15MB then my Ruby process memory increased by 15MB and NEVER come back down. Poof, my 15MB went into the ether. And if you have a long running process your server will eventually die.

Your code must be shit, let's see 'em.

~~~ ruby
require 'net/ftp'
require 'tempfile'

class Satan
  def download path, host, user, pass
    local = Tempfile.new(path)

    Net::FTP.open(host, user, pass) do |ftp|
      local.binmode

      ftp.login(user, pass)
      ftp.passive = true
      ftp.getbinaryfile(path, local.path)
    end

    local
  end
end

Satan.new.download('15MB', 'ftp.server.com', 'happy', 'vegemite')
~~~

Dude, you need to collect the garbage. Fine.

~~~ ruby
    ...

    Net::FTP.open(host, user, pass) do |ftp|
      ...
    end

    # Give me back my 15MB!
    GC.start
    sleep 10

    # Please!
    GC.start
    sleep 10

    # Pretty Please?!
    GC.start
    sleep 10

    # Pretty Pretty Please!?
    GC.start
    sleep 10

    ...
~~~

What garbage? I still lost 15MB.

stdlib probably has some buffering, screw that, let's talk FTP and download stream direct.

~~~ ruby

    ...

    Net::FTP.open(host, user, pass) do |ftp|
      local.binmode

      ftp.synchronize do
        # Holy Server, give me only binary, and only binary
        ftp.voidcmd("TYPE I")

        # Show me where to get it
        host, port = ftp.send('makepasv')
        socket = TCPSocket.open(host, port)

        # I'm ready, give me now!
        ftp.sendcmd("RETR #{remote}")

        # ahhh
        IO.copy_stream(socket, local)
      end
    end

    # Be gone! I beg you no more!
    # GC.start

    ...
~~~

There you have it folks FTP stream in Ruby. Any questions, don't ask!
