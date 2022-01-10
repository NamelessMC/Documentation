# Setting up MySQL
[[toc]]

## Creating a database for your website
MySQL is a core component of Nameless but it can be confusing to setup and use if you've never done so before.
This is a very basic tutorial that skims just enough of the surface to set MySQL up and running with your website.
If you're interested in learning more, there are some great tutorials available on the Internet.

### Logging In
The first step in this process is to login to the MySQL command line where we will be executing some statements to get
things setup. To do so, simply run the command below and provide the Root MySQL account's password that you setup when
installing MySQL. If you do not remember doing this, chances are you can just hit enter as no password is set.

``` bash
mysql -u root -p
```

### Creating a user
For security sake, and due to changes in MySQL 5.7, you'll need to create a new user for your website. To do so, we want
to first tell MySQL to use the mysql database, which stores such information.

Next, we will create a user called `nameless` and allow logins from localhost which prevents any external connections
to our database. You can also use `%` as a wildcard or enter a numeric IP, but not recommended. We will also set the account password
to `somePassword`.

``` sql
# Remember to change 'somePassword' below to be a unique password specific to this account.
CREATE USER 'nameless'@'127.0.0.1' IDENTIFIED BY 'somePassword';
```

### Create a database
Next, we need to create a database for your website. In this tutorial we will be naming the database `nameless`, but you can
substitute that for whatever name you wish.

``` sql
CREATE DATABASE nameless;
```

### Assigning permissions
Finally, we need to tell MySQL that our nameless user should have access to the nameless database. To do this, simply
run the command below.

``` sql
GRANT ALL PRIVILEGES ON nameless.* TO 'nameless'@'127.0.0.1' WITH GRANT OPTION;
```