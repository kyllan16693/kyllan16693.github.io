# Homelab

## Homelab 2.2.2 (Update)
#### February 2024

After too long of not having a homepage for my homelab, I finally made one. I used <a href="https://github.com/gethomepage/homepage" target="_blank" rel="noopener noreferrer">Homepage</a> to make it. It was super simple to set up and I like how it is code-based so it can be easily shared and reconfigured. 


## Homelab 2.2.1 (Update)
#### December 2023

Small update, In an LXC container I have set up <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer"> WireGuard</a> a secure VPN tunnel to access my home network anywhere I go. I've used it a few times and it works well, almost as good as a commercial VPN.


## Homelab 2.2 (Update)
#### November 2023

I made the switch over to <a href="https://www.proxmox.com/" target="_blank" rel="noopener noreferrer"> Proxmox</a> to run everything. For <a href="https://www.truenas.com/" target="_blank" rel="noopener noreferrer">TrueNas </a> I set up a VM to run it and passed through my hard drives so it's as fast as it can be. I also setup a vm to run <a href="https://pi-hole.net/" target="_blank" rel="noopener noreferrer"> Pi-hole</a> with <a href="https://nlnetlabs.nl/projects/unbound/about/" target="_blank" rel="noopener noreferrer"> unbound</a> for DNS. This has also been working great, since I've set it up and added my block lists I haven't had to touch it and it does an ok job at blocking ads. The final thing I have set up is <a href="https://github.com/searxng/searxng" target="_blank" rel="noopener noreferrer"> SearXNG </a>a "privacy-respecting" search engine that I can use to search the web without being tracked. This is in an LXC container, I would like to expose it to the internet but I'm not sure how to do that securely yet. I'm happy with how my homelab is coming along and I'm excited to see what I can do with it in the future.  


## Homelab 2.1 (Update)
#### July 2023

<img src="../../images/Truenas.jpg" alt="Truenas Scale" style="width: 100%; height: auto;">

I found an old server tower for sale and picked it up. I'm not sure what it used to be but it has an Intel S1200SPL motherboard and an Intel Xeon CPU E3-1220 v5 @ 3.00GHz with 16Gb of ram. I wanted to install Truenas scale on it but after many attempts, it wouldn't work so I installed Truenas core and then upgraded to scale. It is currently running Nextcloud and a Cloudflare tunnel so I can access it from outside my home network. I plan on installing some more applications on it in the future when I get more storage.


## Homelab 2.0 (Update)
#### January 2023

<img src="https://www.bhphotovideo.com/images/images1000x1000/Drobo_drds4a21_Drobo_5N_5_Bay_NAS_906407.jpg" alt="Drobo 5N" style="width: 50%; height: auto;">

This January I upgraded my homelab a lot. I replaced my old NAS (which was 2 hard drives connected to a Raspberry Pi) with a Drobo 5N. Sadly this company is no longer in business, but I was able to find a used one for a good price. I now have over 14TB (raw) of storage. While compared to some new NAS's, it's not very powerful but it's good enough to run Plex and backup all of my data. I also upgraded my network, I took the old Pi and turned it into a <a href="https://pi-hole.net/" target="_blank" rel="noopener noreferrer">Pi-hole</a>; which acts as a recursive DNS server and blocks any requests leaving or coming in that is a know ad or malware site.


## My Homelab 1.0
#### December 2021

<img src="https://support.plex.tv/wp-content/uploads/sites/4/2013/09/plex-works-matrix-1.png" alt="PlexServerImage" style="width: 100%; height: auto;">

A "Homelab is the name given to a server (or multiple server setup) that resides locally in your home and where you host several applications and virtualized systems for testing and developing or for home and functional usage."<a href="https://linuxhandbook.com/homelab/" target="_blank" rel="noopener noreferrer">-Linux Handbook</a> Over the past year, I have been building my homelab and learning about networking, virtualization, and server administration. I have been using a Raspberry Pi 3 as my main server, connected to 5TB of storage. I am running a headless install of Raspberry PI OS with OpenMediaVault <a href="https://www.openmediavault.org/about.html" target="_blank" rel="noopener noreferrer">(OMV)</a> to control my server. In OMV, I have set up a docker container to run Plex Media Server <a href="https://support.plex.tv/articles/200288286-what-is-plex/" target="_blank" rel="noopener noreferrer">(Plex)</a> Which I can use to stream my media to my TV or other devices. I have also set up my home computers to back up to my NAS regularly. My next step for my homelab would be to purchase a dedicated NAS and move off of the Raspberry Pi. I would also like to set up a VPN server to access my home network remotely.