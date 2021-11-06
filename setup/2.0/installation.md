# Getting Started

[[toc]]
## Dependencies
* PHP `7.4` (recommended) or `8.0` with the following extensions:
    - php-curl
    - php-exif (optional)
    - php-gd with png and jpeg support
    - php-mbstring
    - php-mysql or php-mysqlnd
    - php-pdo
    - php-xml
* MySQL `5.7.22` or higher (MySQL `8` recommended) **or** MariaDB `10.2` or higher.
* A webserver (Apache, NGINX)

::: warning
PHP 8 works for the most part but still has some issues, please stick with PHP 7.4 for now.
:::

## Installing
Here we will be covering installing NamelessMC on [Ubuntu](https://ubuntu.com)
### Installing dependencies
```bash
# Add "add-apt-repository" command
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg

# Add additional repositories for PHP and MariaDB
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash

# Update repositories list
apt update

# Add universe repository if you are on Ubuntu 18.04
apt-add-repository universe

# Install Dependencies
apt -y install php7.4 php7.4-{curl,exif,gd,mbstring,mysql,pdo,xml} mariadb-server nginx tar git
```

### Installation
The first step in this process is to create the folder where the website will live and then move ourselves into that newly created folder. Below is an example of how to perform this operation.

```bash
mkdir -p /var/www/html
cd /var/www/html
```

Once you have created a new directory for the website and moved into it you'll need to download the NamelessMC files. This
is as simple as using `curl` to download our pre-packaged content. Once it is downloaded you'll need to unpack the archive
and then set the correct permissions.

```bash
curl -Lo nameless.tar.gz https://github.com/NamelessMC/Nameless/archive/refs/tags/v2.0.0-pr13.tar.gz
tar -xzvf nameless.tar.gz
chmod -R 755 *
```

Now that all of the files have been downloaded we need to configure the database.

::: tip Database Configuration
You will need a database setup and a user with the correct permissions created for that database before
continuing any further. See below to create a user and database for your website quickly. To find more detailed information
please have a look at [Setting up MySQL](/setup/database.html).

```sql
mysql -u root -p

# Remember to change 'yourPassword' below to be a unique password
CREATE USER 'nameless'@'127.0.0.1' IDENTIFIED BY 'yourPassword';
CREATE DATABASE nameless;
GRANT ALL PRIVILEGES ON nameless.* TO 'nameless'@'127.0.0.1' WITH GRANT OPTION;
```

:::



## Video Tutorials
Here's some video tutorials on installing NamelessMC

* [English | v1.0.15 only](https://www.youtube.com/watch?v=aTcZ8MbBixs)

* [English | v2-pr6 / v2-pr7](https://www.youtube.com/watch?v=vWQM48a1qQ4)

* [English | v2-pr7](https://www.youtube.com/watch?v=Lu2Bt9AKujo)

* [Spanish | v2-pr7](https://www.youtube.com/watch?v=UlJTeYFHzA8)