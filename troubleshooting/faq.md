# FAQ

Here you can find a list of frequently asked questions and their answers.

## The requested URL was not found on this server

::: tip Note
If you have installed NamelessMC with our installation, this shouldn't happen
:::

### Solution 1
Your webserver is not configured to allow the .htaccess file. Ensure a file named `.htaccess` exists in your web server's root directory containing [these rules](https://raw.githubusercontent.com/NamelessMC/Nameless/v2/.htaccess).


```bash
chmod -R 755 /var/www/html/.htaccess
```

### Solution 2

#### Using Apache webserver

One possibility is that you've installed NamelessMC within a subdirectory. A requirement for the package to function is that the files are installed directly into your root directory, or you use a subdomain to point to the subdirectory.

If this is not the case, you will need to modify your server configuration to enable the use of .htaccess files and also Apache's mod_rewrite module.

Usually this occurs if you are running Apache on Ubuntu/Debian, in which case the following should resolve your issue:
- Edit `/etc/apache2/sites-available/000-default.conf` (or whichever conf file corresponds to your Nameless installation)
- Before the bottom `</VirtualHost>`, add (but **replace** `/var/www/html` with the directory Nameless is installed in):
```
<Directory /var/www/html>
    AllowOverride All
</Directory>
```
- Save and exit the file
- Type `sudo a2enmod rewrite` to enable Apache's rewrite module
- Type `sudo service apache2 restart` to restart Apache

#### Using Nginx webserver

Use the location blocks from the example [nginx config file](https://github.com/NamelessMC/Nameless/blob/v2/nginx.example).

## SQLSTATE[HY000] [2002] No such file or directory
Your web server can't use the `/tmp/mysql.sock` file, as it doesn't exist or has no permissions.

```bash
ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock
# If that doesn't work, try giving your web server access to that file.
chmod -R 777 /tmp/mysql.sock
```

## Where can I download the NamelessMC plugin?

* [v1 for Spigot and Bungeecord](https://www.spigotmc.org/resources/official-namelessplugin.42698/)
* [v2 for Spigot only](https://www.spigotmc.org/resources/nameless-plugin-for-v2.59032/)

## NamelessMC won't send emails to users

Nameless will try to use PHP's mail function by default, however if this doesn't work there are a few alternatives available.

The first is to install sendmail (for example, `sudo apt-get install sendmail` and then `sudo sendmailconfig` on Ubuntu), and then configure PHP to use this (see the "Configuring PHP mail() function" section of [this page](http://developernote.com/2012/07/how-i-configured-sendmail-for-php-on-ubuntu-server-12-04/), Ubuntu). 

The second is to configure NamelessMC to use either an SMTP server or Gmail. If you want to use SMTP, try [this](/setup/smtp.html). After completing either of these, you need to head into the `AdminCP -> Core -> Email` and enable the `Use PHPMailer function?`.

Finally, you can disable email verification altogether by disabling `Enable email account verification?` in the `AdminCP -> Core -> Email tab`, although this isn't recommended as it could effectively mean users can register with any email address.

## I'm getting a white screen after installing NamelessMC

This is usually caused by the `cache` folder within the web root (and its subdirectories) not being writable. You will need to modify the permissions recursively of the folder so the process running PHP can write to it.

An _example_ command for Apache and nginx on Ubuntu is

```sh
sudo chown -R www-data:www-data /var/www/html/cache
```

## My core/config.php is not writable!

**Error:** Your core/config.php is not writable. Please check your file permissions.

**Solution:** Check the file permissions on the ``core/config.php`` file and make sure it is set to ``775``. If you don't know how to change the file permissions or having other difficulties, click [here](https://www.youtube.com/watch?v=Rqr98H1-o94) for a helpful video.

## How can I set a favicon?

Setting a favicon is very simple! Keep in mind the process is different on **both** versions of Namelesss!

**NamelessMC V1**
- Make sure the favicon is named `favicon.ico` (Notice the .ico format - for example don't rename a .png to a .ico)
- Upload the favicon to the /core/assets directory.
- If you cannot see the newly added favicon, all you have to do is clear the browser cache by viewing your site and pressing <kbd>Ctrl</kbd> + <kbd>F5</kbd> on Windows, or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on MacOS.

**NamelessMC V2**
- Make sure the favicon is named `favicon.ico` (Notice the .ico format - for example don't rename a .png to a .ico)
- Upload the favicon to the root directory (public_html, htdocs, or /var/www/html).
- If you cannot see the newly added favicon, all you have to do is clear the browser cache by viewing your site and pressing <kbd>Ctrl</kbd> + <kbd>F5</kbd> on Windows, or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on MacOS.

## How can I upgrade to NamelessMC V2?

If you want to upgrade from v1, follow the instructions below. You will not be able to downgrade after you finished upgrading to the new version of Nameless so be sure to backup your site!

1. Backup your current v1 files and your database.
2. Remove all the v1 files from your web server.
3. Upload all the v2 files from the Github using the links provided below.
4. Run through the installer and make sure you select that this is an upgrade from v1 when installing.

Latest Pre-Release (v2 - pr13) - Click [here](https://github.com/NamelessMC/Nameless/releases/tag/v2.0.0-pr13)!

Latest Development Code (Use at your own risk!) - Click [here](https://github.com/NamelessMC/Nameless/archive/v2.zip)!

## I can't log in, my captcha settings are broken
### v2-pr10+
Set `captcha` to `false` in `core/config.php`

### Other versions
Disable captcha by editing the database
```
UPDATE nl2_settings SET value='false' WHERE name='recaptcha_login'
UPDATE nl2_settings SET value='false' WHERE name='recaptcha'
```

## I don't remember my admin password, how do I change it?

In your database, find the `nl2_users` table and change `password` for your user to `$2y$13$Q1NRQCPQNhs4EihdJSidQ.31bw2CTPSH03QrXd9EOH3sYuni1fbSu` and `pass_method` to `default`.

Then, you'll be able to log in using the password '123456'

## I enabled force https or force www, now my website is in a redirect loop
### v2-pr10+
Set `force-https` and/or `force-www` to `false` in `core/config.php`

## Two factor authentication doesn't work
To disable two factor authentication on login for all users: `UPDATE nl2_users SET tfa_enabled=0`
To disable forced two factor authentication setup for all groups: `UPDATE nl2_groups SET force_tfa=0`

### Other versions
Delete the following files
* `cache/033f3da34ae9ec9661072ab0897ddf7ed642de3f.cache` (force HTTPS)
* `cache/a48fdb02e34b9602632d13dd91f0536d3b9bb559.cache` (force www)
