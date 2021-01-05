Last login: Tue Jan  5 12:41:22 on ttys001
OSs-MacBook-Pro:~ osx$ ssh root@45.32.118.51
ssh: connect to host 45.32.118.51 port 22: Network is unreachable
OSs-MacBook-Pro:~ osx$ 5cE#n*K_#QCT@U?,
-bash: 5cE#n*K_#QCT@U?,: command not found
OSs-MacBook-Pro:~ osx$ ssh root@45.32.118.51
ssh: connect to host 45.32.118.51 port 22: Network is unreachable
OSs-MacBook-Pro:~ osx$ ssh root@45.32.118.51
root@45.32.118.51's password: 
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 4.15.0-124-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Jan  5 12:43:07 WIB 2021

  System load:  0.02               Processes:              107
  Usage of /:   36.1% of 23.41GB   Users logged in:        0
  Memory usage: 45%                IP address for ens3:    45.32.118.51
  Swap usage:   0%                 IP address for docker0: 172.17.0.1

 * Introducing self-healing high availability clusters in MicroK8s.
   Simple, hardened, Kubernetes for production, from RaspberryPi to DC.

     https://microk8s.io/high-availability

 * Canonical Livepatch is available for installation.
   - Reduce system reboots and improve kernel security. Activate at:
     https://ubuntu.com/livepatch

42 packages can be updated.
21 updates are security updates.

New release '20.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


*** System restart required ***
Last login: Tue Jan  5 12:04:30 2021 from 114.124.166.96
root@anjasmara-vultr:~# docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED        STATUS        PORTS                                                                                                NAMES
7e23a008f599   kong:latest                     "/docker-entrypoint.…"   28 hours ago   Up 28 hours   0.0.0.0:8000->8000/tcp, 127.0.0.1:8001->8001/tcp, 0.0.0.0:8443->8443/tcp, 127.0.0.1:8444->8444/tcp   kong
96a84a096379   postgres:9.6                    "docker-entrypoint.s…"   28 hours ago   Up 28 hours   0.0.0.0:5432->5432/tcp                                                                               kong-database
41f12d464482   anjasmara/nodejs-user-service   "docker-entrypoint.s…"   39 hours ago   Up 28 hours   0.0.0.0:3000->3000/tcp                                                                               container_user_anjasmara
root@anjasmara-vultr:~# nginx

Command 'nginx' not found, but can be installed with:

apt install nginx-core  
apt install nginx-extras
apt install nginx-full  
apt install nginx-light 

root@anjasmara-vultr:~# apt install nginx
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  apache2-data apache2-utils libpcre2-16-0 libpcre2-32-0 libpcre2-dev
  libpcre2-posix2 pkg-config pkg-php-tools shtool
Use 'apt autoremove' to remove them.
The following additional packages will be installed:
  libnginx-mod-http-geoip libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream
  nginx-common nginx-core
Suggested packages:
  fcgiwrap nginx-doc
The following NEW packages will be installed:
  libnginx-mod-http-geoip libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream nginx
  nginx-common nginx-core
0 upgraded, 8 newly installed, 0 to remove and 40 not upgraded.
Need to get 598 kB of archives.
After this operation, 2120 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 nginx-common all 1.14.0-0ubuntu1.7 [37.4 kB]
Get:2 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libnginx-mod-http-geoip amd64 1.14.0-0ubuntu1.7 [11.2 kB]
Get:3 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libnginx-mod-http-image-filter amd64 1.14.0-0ubuntu1.7 [14.6 kB]
Get:4 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libnginx-mod-http-xslt-filter amd64 1.14.0-0ubuntu1.7 [13.0 kB]
Get:5 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libnginx-mod-mail amd64 1.14.0-0ubuntu1.7 [41.8 kB]
Get:6 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libnginx-mod-stream amd64 1.14.0-0ubuntu1.7 [63.7 kB]
Get:7 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 nginx-core amd64 1.14.0-0ubuntu1.7 [413 kB]
Get:8 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 nginx all 1.14.0-0ubuntu1.7 [3596 B]
Fetched 598 kB in 1s (484 kB/s)
Preconfiguring packages ...
Selecting previously unselected package nginx-common.
(Reading database ... 119005 files and directories currently installed.)
Preparing to unpack .../0-nginx-common_1.14.0-0ubuntu1.7_all.deb ...
Unpacking nginx-common (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package libnginx-mod-http-geoip.
Preparing to unpack .../1-libnginx-mod-http-geoip_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking libnginx-mod-http-geoip (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package libnginx-mod-http-image-filter.
Preparing to unpack .../2-libnginx-mod-http-image-filter_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking libnginx-mod-http-image-filter (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package libnginx-mod-http-xslt-filter.
Preparing to unpack .../3-libnginx-mod-http-xslt-filter_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking libnginx-mod-http-xslt-filter (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package libnginx-mod-mail.
Preparing to unpack .../4-libnginx-mod-mail_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking libnginx-mod-mail (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package libnginx-mod-stream.
Preparing to unpack .../5-libnginx-mod-stream_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking libnginx-mod-stream (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package nginx-core.
Preparing to unpack .../6-nginx-core_1.14.0-0ubuntu1.7_amd64.deb ...
Unpacking nginx-core (1.14.0-0ubuntu1.7) ...
Selecting previously unselected package nginx.
Preparing to unpack .../7-nginx_1.14.0-0ubuntu1.7_all.deb ...
Unpacking nginx (1.14.0-0ubuntu1.7) ...
Setting up nginx-common (1.14.0-0ubuntu1.7) ...
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.
Setting up libnginx-mod-http-image-filter (1.14.0-0ubuntu1.7) ...
Setting up libnginx-mod-mail (1.14.0-0ubuntu1.7) ...
Setting up libnginx-mod-http-xslt-filter (1.14.0-0ubuntu1.7) ...
Setting up libnginx-mod-http-geoip (1.14.0-0ubuntu1.7) ...
Setting up libnginx-mod-stream (1.14.0-0ubuntu1.7) ...
Setting up nginx-core (1.14.0-0ubuntu1.7) ...
Setting up nginx (1.14.0-0ubuntu1.7) ...
Processing triggers for man-db (2.8.3-2ubuntu0.1) ...
Processing triggers for ufw (0.36-0ubuntu0.18.04.1) ...
Processing triggers for ureadahead (0.100.0-21) ...
Processing triggers for systemd (237-3ubuntu10.43) ...
root@anjasmara-vultr:~# systemctl status ngnx
Unit ngnx.service could not be found.
root@anjasmara-vultr:~# systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: en
   Active: active (running) since Tue 2021-01-05 12:44:38 WIB; 18s ago
     Docs: man:nginx(8)
 Main PID: 2367 (nginx)
    Tasks: 2 (limit: 1107)
   CGroup: /system.slice/nginx.service
           ├─2367 nginx: master process /usr/sbin/nginx -g daemon on; master_pro
           └─2369 nginx: worker process
lines 1-9/9 (END)
root@anjasmara-vultr:~# firwall-cmd --list-all

Command 'firwall-cmd' not found, did you mean:

  command 'firewall-cmd' from deb firewalld

Try: apt install <deb name>

root@anjasmara-vultr:~# apt install firewall-cmd
Reading package lists... Done
Building dependency tree       
Reading state information... Done
E: Unable to locate package firewall-cmd
root@anjasmara-vultr:~# ufw app list
Available applications:
  Apache
  Apache Full
  Apache Secure
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
root@anjasmara-vultr:~# ufw status
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere                  
22/tcp (v6)                ALLOW       Anywhere (v6)             
22 (v6)                    DENY        Anywhere (v6)             

root@anjasmara-vultr:~# curl -4 icanhazip.com
45.32.118.51
root@anjasmara-vultr:~# packet_write_wait: Connection to 45.32.118.51 port 22: Broken pipe
OSs-MacBook-Pro:~ osx$ ssh root@45.32.118.51
root@45.32.118.51's password: 
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 4.15.0-124-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Jan  5 12:57:25 WIB 2021

  System load:  0.01               Processes:              111
  Usage of /:   36.1% of 23.41GB   Users logged in:        1
  Memory usage: 45%                IP address for ens3:    45.32.118.51
  Swap usage:   0%                 IP address for docker0: 172.17.0.1

 * Introducing self-healing high availability clusters in MicroK8s.
   Simple, hardened, Kubernetes for production, from RaspberryPi to DC.

     https://microk8s.io/high-availability

 * Canonical Livepatch is available for installation.
   - Reduce system reboots and improve kernel security. Activate at:
     https://ubuntu.com/livepatch

42 packages can be updated.
21 updates are security updates.

New release '20.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


*** System restart required ***
Last login: Tue Jan  5 12:43:09 2021 from 180.246.150.116
root@anjasmara-vultr:~# docker images 
REPOSITORY                           TAG            IMAGE ID       CREATED        SIZE
anjasmara/konga                      latest         69d846d715e9   25 hours ago   416MB
mariadbvolume                        latest         31d4ed749247   38 hours ago   394MB
anjasmara/laravel8-general-service   latest         5b0b7dec51bd   39 hours ago   506MB
anjasmara/nodejs-user-service        latest         b7b5b0c72cb1   40 hours ago   980MB
postgres                             9.6            a079fbbbba9f   6 days ago     200MB
node                                 14             72aaced1868f   2 weeks ago    942MB
kong                                 latest         a97d41b7e3eb   2 weeks ago    148MB
nginx                                latest         ae2feff98a0c   2 weeks ago    133MB
php                                  7.3-fpm        ddd0b4ebc03a   3 weeks ago    398MB
php                                  7.4-fpm        14098ddb1a4e   3 weeks ago    405MB
mariadb/server                       10.4           1c07fec6eea9   4 weeks ago    357MB
pantsel/konga                        latest         113950dafdbb   7 months ago   409MB
node                                 12.16-alpine   7a48db49edbf   8 months ago   88.7MB
php                                  7.3.0-fpm      93954438aaa4   2 years ago    367MB
root@anjasmara-vultr:~# docker run --name container_general -p=3001:3001 anjasmara/laravel8-general-service -d
Usage: php [-n] [-e] [-h] [-i] [-m] [-v] [-t] [-p <prefix>] [-g <pid>] [-c <file>] [-d foo[=bar]] [-y <file>] [-D] [-F [-O]]
  -c <path>|<file> Look for php.ini file in this directory
  -n               No php.ini file will be used
  -d foo[=bar]     Define INI entry foo with value 'bar'
  -e               Generate extended information for debugger/profiler
  -h               This help
  -i               PHP information
  -m               Show compiled in modules
  -v               Version number
  -p, --prefix <dir>
                   Specify alternative prefix path to FastCGI process manager (default: /usr/local).
  -g, --pid <file>
                   Specify the PID file location.
  -y, --fpm-config <file>
                   Specify alternative path to FastCGI process manager config file.
  -t, --test       Test FPM configuration and exit
  -D, --daemonize  force to run in background, and ignore daemonize option from config file
  -F, --nodaemonize
                   force to stay in foreground, and ignore daemonize option from config file
  -O, --force-stderr
                   force output to stderr in nodaemonize even if stderr is not a TTY
  -R, --allow-to-run-as-root
                   Allow pool to run as root (disabled by default)
root@anjasmara-vultr:~# docker run --name container_general -p=3001:3001 -d anjasmara/laravel8-general-service
docker: Error response from daemon: Conflict. The container name "/container_general" is already in use by container "b4062ca182e7a0c3e0f9d7a46511384f17e33070124f7bb02042cfb5b04cc8a8". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
root@anjasmara-vultr:~# docker run --name container_general -p=3001:3001 -d anjasmara/laravel8-general-service
docker: Error response from daemon: Conflict. The container name "/container_general" is already in use by container "b4062ca182e7a0c3e0f9d7a46511384f17e33070124f7bb02042cfb5b04cc8a8". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
root@anjasmara-vultr:~# docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED        STATUS        PORTS                                                                                                NAMES
7e23a008f599   kong:latest                     "/docker-entrypoint.…"   28 hours ago   Up 28 hours   0.0.0.0:8000->8000/tcp, 127.0.0.1:8001->8001/tcp, 0.0.0.0:8443->8443/tcp, 127.0.0.1:8444->8444/tcp   kong
96a84a096379   postgres:9.6                    "docker-entrypoint.s…"   28 hours ago   Up 28 hours   0.0.0.0:5432->5432/tcp                                                                               kong-database
41f12d464482   anjasmara/nodejs-user-service   "docker-entrypoint.s…"   39 hours ago   Up 28 hours   0.0.0.0:3000->3000/tcp                                                                               container_user_anjasmara
root@anjasmara-vultr:~# docker images
REPOSITORY                           TAG            IMAGE ID       CREATED        SIZE
anjasmara/konga                      latest         69d846d715e9   25 hours ago   416MB
mariadbvolume                        latest         31d4ed749247   38 hours ago   394MB
anjasmara/laravel8-general-service   latest         5b0b7dec51bd   39 hours ago   506MB
anjasmara/nodejs-user-service        latest         b7b5b0c72cb1   40 hours ago   980MB
postgres                             9.6            a079fbbbba9f   6 days ago     200MB
node                                 14             72aaced1868f   2 weeks ago    942MB
kong                                 latest         a97d41b7e3eb   2 weeks ago    148MB
nginx                                latest         ae2feff98a0c   2 weeks ago    133MB
php                                  7.3-fpm        ddd0b4ebc03a   3 weeks ago    398MB
php                                  7.4-fpm        14098ddb1a4e   3 weeks ago    405MB
mariadb/server                       10.4           1c07fec6eea9   4 weeks ago    357MB
pantsel/konga                        latest         113950dafdbb   7 months ago   409MB
node                                 12.16-alpine   7a48db49edbf   8 months ago   88.7MB
php                                  7.3.0-fpm      93954438aaa4   2 years ago    367MB
root@anjasmara-vultr:~# docker run --name container_general -p 3001:3001 -d anjasmara/laravel8-general-service
docker: Error response from daemon: Conflict. The container name "/container_general" is already in use by container "b4062ca182e7a0c3e0f9d7a46511384f17e33070124f7bb02042cfb5b04cc8a8". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
root@anjasmara-vultr:~# docker ps -a
CONTAINER ID   IMAGE                                COMMAND                  CREATED              STATUS                           PORTS                                                                                                NAMES
b4062ca182e7   anjasmara/laravel8-general-service   "docker-php-entrypoi…"   About a minute ago   Exited (64) About a minute ago                                                                                                        container_general
7e23a008f599   kong:latest                          "/docker-entrypoint.…"   28 hours ago         Up 28 hours                      0.0.0.0:8000->8000/tcp, 127.0.0.1:8001->8001/tcp, 0.0.0.0:8443->8443/tcp, 127.0.0.1:8444->8444/tcp   kong
96a84a096379   postgres:9.6                         "docker-entrypoint.s…"   28 hours ago         Up 28 hours                      0.0.0.0:5432->5432/tcp                                                                               kong-database
c988d5a70ee3   mariadb/server:10.4                  "docker-entrypoint.s…"   37 hours ago         Exited (0) 28 hours ago                                                                                                               container_mariadb
41f12d464482   anjasmara/nodejs-user-service        "docker-entrypoint.s…"   39 hours ago         Up 28 hours                      0.0.0.0:3000->3000/tcp                                                                               container_user_anjasmara
root@anjasmara-vultr:~# docker stop container_general
container_general
root@anjasmara-vultr:~# docker rm container_general
container_general
root@anjasmara-vultr:~# docker run --name container_general -p 3001:3001 -d anjasmara/laravel8-general-service
12139ea0eaa32fb611155ed5b7125015a8d69e6bb89e4693af19f9d71d6c370e
root@anjasmara-vultr:~# docker logs container_general
Starting Laravel development server: http://127.0.0.1:3001
root@anjasmara-vultr:~# docker logs container_general
Starting Laravel development server: http://127.0.0.1:3001
root@anjasmara-vultr:~# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_general
172.17.0.5
root@anjasmara-vultr:~# curl -X GET 172.17.0.5:3001
curl: (7) Failed to connect to 172.17.0.5 port 3001: Connection refused
root@anjasmara-vultr:~# curl 172.17.0.5:3001
curl: (7) Failed to connect to 172.17.0.5 port 3001: Connection refused
root@anjasmara-vultr:~# curl -i 172.17.0.5:3001
curl: (7) Failed to connect to 172.17.0.5 port 3001: Connection refused
root@anjasmara-vultr:~# ping 172.17.0.5
PING 172.17.0.5 (172.17.0.5) 56(84) bytes of data.
64 bytes from 172.17.0.5: icmp_seq=1 ttl=64 time=0.106 ms
64 bytes from 172.17.0.5: icmp_seq=2 ttl=64 time=0.115 ms
64 bytes from 172.17.0.5: icmp_seq=3 ttl=64 time=0.086 ms
64 bytes from 172.17.0.5: icmp_seq=4 ttl=64 time=0.071 ms
^C
--- 172.17.0.5 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3079ms
rtt min/avg/max/mdev = 0.071/0.094/0.115/0.019 ms
root@anjasmara-vultr:~# docker logs container_general
Starting Laravel development server: http://127.0.0.1:3001
root@anjasmara-vultr:~# docker exec -it container_general bash
root@12139ea0eaa3:/generals# nano Dockerfile 
bash: nano: command not found
root@12139ea0eaa3:/generals# ls
Dockerfile  app      bootstrap	    composer.lock  database	       package.json  public	routes	    storage  vendor
README.md   artisan  composer.json  config	   docker-compose.yml  phpunit.xml   resources	server.php  tests    webpack.mix.js
root@12139ea0eaa3:/generals# apt update
Get:1 http://security.debian.org/debian-security buster/updates InRelease [65.4 kB]
Hit:2 http://deb.debian.org/debian buster InRelease  
Get:3 http://deb.debian.org/debian buster-updates InRelease [51.9 kB]
Get:4 http://security.debian.org/debian-security buster/updates/main amd64 Packages [260 kB]
Fetched 377 kB in 1s (612 kB/s)  
Reading package lists... Done
Building dependency tree       
Reading state information... Done
2 packages can be upgraded. Run 'apt list --upgradable' to see them.
root@12139ea0eaa3:/generals# apt install nano  
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following package was automatically installed and is no longer required:
  lsb-base
Use 'apt autoremove' to remove it.
Suggested packages:
  spell
The following NEW packages will be installed:
  nano
0 upgraded, 1 newly installed, 0 to remove and 2 not upgraded.
Need to get 544 kB of archives.
After this operation, 2269 kB of additional disk space will be used.
Get:1 http://deb.debian.org/debian buster/main amd64 nano amd64 3.2-3 [544 kB]
Fetched 544 kB in 0s (24.9 MB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package nano.
(Reading database ... 14076 files and directories currently installed.)
Preparing to unpack .../archives/nano_3.2-3_amd64.deb ...
Unpacking nano (3.2-3) ...
Setting up nano (3.2-3) ...
update-alternatives: using /bin/nano to provide /usr/bin/editor (editor) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/man1/editor.1.gz because associated file /usr/share/man/man1/nano.1.gz (of link group editor) doesn't exist
update-alternatives: using /bin/nano to provide /usr/bin/pico (pico) in auto mode
update-alternatives: warning: skip creation of /usr/share/man/man1/pico.1.gz because associated file /usr/share/man/man1/nano.1.gz (of link group pico) doesn't exist
root@12139ea0eaa3:/generals# nano Dockerfile 
root@12139ea0eaa3:/generals# exit
exit
root@anjasmara-vultr:~# docker restart container_general
container_general
root@anjasmara-vultr:~# docker logs container_general
Starting Laravel development server: http://127.0.0.1:3001
Starting Laravel development server: http://127.0.0.1:3001
root@anjasmara-vultr:~# cd ../home/docker/
root@anjasmara-vultr:/home/docker# ls
anjasmara_service_general  anjasmara_service_user_v1
root@anjasmara-vultr:/home/docker# cd anjasmara_service_general/
root@anjasmara-vultr:/home/docker/anjasmara_service_general# ls
Dockerfile  app      bootstrap      composer.lock  database      phpunit.xml  resources  server.php  tests   webpack.mix.js
README.md   artisan  composer.json  config         package.json  public       routes     storage     vendor
root@anjasmara-vultr:/home/docker/anjasmara_service_general# nano Dockerfile 
root@anjasmara-vultr:/home/docker/anjasmara_service_general# cd ..
root@anjasmara-vultr:/home/docker# cd ..
root@anjasmara-vultr:/home# docker exec -it container_general bash
root@12139ea0eaa3:/generals# nano Dockerfile 

  GNU nano 3.2                                                        Dockerfile                                                                   

FROM php:7.3-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev zip unzip git \
    && pecl install mcrypt-1.0.2 \
    && docker-php-ext-enable mcrypt

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo mbstring

WORKDIR /generals
COPY . /generals

RUN composer install
CMD php artisan serve --host=0.0.0.0 --port=3001

EXPOSE 3001

