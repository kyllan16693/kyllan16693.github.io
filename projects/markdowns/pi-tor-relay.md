# Setting up a tor relay on a raspberry pi
#### November 2023
After having my Magic Mirror setup for awhile it is very useful but I cant help but think about else I could do with it as it seems to be underutilizeing my pi, I was also bored.

After watching [this NetworkChuck video](https://www.youtube.com/watch?v=tBnJRraXDc0) I realized this was the perfect project to do with my pi. (He has his own turoial [here](https://academy.networkchuck.com/blog/run-a-tor-relay) which will work with most newer non arm systems)

Looking how many resources the pi was using while running the mirror I decided to run the relay on the same pi. 

The first step to do this was follow the instructions in the NetworkChuck video only to start up nyx (a tor monitoring tool) and see that tor version I was using was obsolete but apt was saying it was up to date.


After much digging I found [this page](https://support.torproject.org/apt/tor-deb-repo/) which has you run this command to see what CPU architecture you are running on.

```
dpkg --print-architecture
```

If you get ```amd64```, ```arm64```, or ```i386``` Then your all good to go and install tor from your package manager. But if you get ```armhf``` like I did then you need to compile tor from source.

### Before you complie

Start off as always with 

```
sudo apt update
sudo apt upgrade
```

Then install the dependencies for compiling tor

```
apt install libevent-dev
```

To run tor you'll need to install 

```
apt install apt-transport-https
```

and while your installing dependencies you might as well install nyx (a tor monitoring tool)

```
apt install nyx
```

If you want to do everything at once copy and paste this into your terminal

```
sudo apt update && sudo apt upgrade && sudo apt install libevent-dev apt-transport-https nyx
```


### Compiling tor

You'll want to get the newest version from [here](https://www.torproject.org/download/tor/) for me that was 0.4.8.8

Right click on the download link and copy the link address then run ```wget``` with the link you copied. For me that was:

```
wget https://dist.torproject.org/tor-0.4.8.8.tar.gz
```

then extract the files

```
tar xzf tor-0.4.8.8.tar.gz
```

then cd into the directory

```
cd tor-0.4.8.8
```

then run 

```
./configure && make
```
I had to run this as sudo
    
```
sudo ./configure && sudo make
```

Now your able to run tor with the command 

```
src/app/tor
```

But if you want to install it in ```/usr/local/``` so you can just run it with the command ```tor``` then run

```
make install
```

To make sure tor was compiled correctly run

```
src/app/tor
```
or
```
tor
```

and you should get something like this

```
[notice] Tor 0.4.8.8 running on Linux with Libevent 2.1.12-stable, OpenSSL 1.1.1w, Zlib 1.2.11, Liblzma N/A, Libzstd N/A and Glibc 2.31 as libc.

...

[notice] Bootstrapped 100% (done): Done
```

wait until to gets to 100% to make sure it is working correctly

then press ```ctrl + c``` to stop tor since it is not yet configured


### Configuring tor

Navigate to the directory where the config file is located

```
cd /usr/local/etc/tor/
```

By default there will only be the ```torrc.sample``` sample file. The final config file will be named ```torrc``` create that file with 

Before we create the config file take a look at the sample file with 

```
cat torrc.sample
```

READ THIS EXTENSIVELY

You can very easily mess up your tor relay if you don't know what your doing. Do NOT blindly copy and paste my config options.

Once you understand what to do create the config file with 

```
nano torrc
```

I will only be setting my pi up as a relay and not using the tor browser. This is what my config file looks like

```
SOCKSPort 0
ControlPort 9051
CookieAuthentication 1
ORPort 443
Nickname [REDACTED]
RelayBandwidthRate 20 MBytes
RelayBandwidthBurst 25 MBytes
ContactInfo [REDACTED]
ExitRelay 0
```

Set your bandwidth rate to be the average upload speed you want tor to use and the burst to be the max upload speed you want tor to use. (I would recommend setting rate to 1/3 of your upload speed and burst to 1/2 of your upload speed)

My relay kept searching for an IPv6 address and failing so I had to edit this line in my config file (There is multiple ways to do this)

```
ORPort 443 IPv4Only
```


### Starting tor and monitoring

To start tor run

```
tor
```


Now you can monitor your relay with nyx

```
nyx
```

This will give you a nice terminal based GUI to monitor your relay and display stats and log messages.

And thats it! You now have a tor relay running on your pi. 

If you want to see your relay on the tor network go to [this page](https://metrics.torproject.org/rs.html#search/) and search for your relay nickname.

Since mine is running on my magic mirror I have a terminal window open with nyx running on top of my magic mirror display so I can monitor it at all times. Sadly you can not pin a window to the top of the screen in raspbian so I have magic mirror running in the browser and the terminal window on top of it. 



Tor can be used to access the dark web to do horrible things but it is also used by people in countries with oppressive governments to access the internet without being tracked. By running a relay you are helping these people access the internet, avoid censorship, report on corruption, and much more. Anonymity online is a powerful tool and can be used for good or bad, you must decide how you want to use it.