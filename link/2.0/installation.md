# Installation
Probably don't self-host if:
- Your first thought is to look for a free hosting service or managed discord bot hosting
- You need environment-specific help for getting the bot up and running

Consider self-hosting if:
- You already host the website on a VPS or your own infrastructure
- Privacy and security is important to you and you know what to do to ensure this

Only self-host if you know what you're doing, we provide limited (read: no) support for self-hosting.

## Stateless mode (recommended)
Does not require a database, only allows one website and one Discord server. This is the easiest to set up and recommended for everyone hosting a bot for their website.

### Using docker (recommended)
1. Download the [example stateless docker-compose file](https://raw.githubusercontent.com/NamelessMC/Nameless-Link/master/docker-compose.prod-stateless.yaml) and save it as `docker-compose.yaml` (right click the link -> save as)
2. Fill in the required settings and read the comments about making the bot accessible outside of the container
3. Start in foreground using `docker-compose up`. If it works, start in background using `docker-compose up -d`.

### Manually
Assuming a standard Linux environment. Hosting on Windows is possible but not supported.

1. Install Java 11 or higher (e.g. `apt install openjdk-11-jre-headless`)
2. Create and enter a directory for the bot files, e.g. `/opt/nameless/discord`
3. Download the bot jar file [here](https://ci.rkslot.nl/job/Nameless%20Link/)
4. Create a script to launch the bot (e.g. start.sh). Set [environment variables](https://github.com/NamelessMC/Nameless-Link/wiki/Environment-variables) then start the bot using `java -jar Nameless-Link.jar`. Example:
   ```sh
   #!/bin/bash
   set -e
   export BOT_URL="http://localhost:27362"
   export WEBSERVER_PORT="27362"
   export API_URL="enter nameless api url here"
   export GUILD_ID="enter discord server id here"
   export DISCORD_TOKEN="enter bot token here"
   java -jar /path/to/Nameless-Link.jar # it's important that this is an absolute path if you intend to run this script from a systemd unit file!
5. Try running the script using `bash start.sh`
6. If it works, create a systemd unit file to run it as a daemon at startup. Example, might need changing:
   ```systemd
   [Unit]
   Description=Nameless Link Bot Service.

   [Service]
   Type=simple
   ExecStart=/bin/bash /opt/nameless/discord/start.sh

   [Install]
   WantedBy=multi-user.target
   ```
   1. Put contents above in file `/etc/systemd/system/nlink.service`
   2. Run `chmod 644 /etc/systemd/system/nlink.service`
   3. Run `systemctl start nlink` and `systemctl status nlink`.
   4. To start the service on boot, run `systemctl enable nlink`

<!-- Thanks to Akutasan on discord for parts of these instructions -->

## Database mode
This is what we use to host the central bot.

### Using docker
1. Download the [example postgres docker-compose file](https://raw.githubusercontent.com/NamelessMC/Nameless-Link/master/docker-compose.prod-postgres.yaml) and save it as `docker-compose.yaml` (right click the link -> save as)
2. Fill in the required settings and read the comments about making the bot accessible outside of the container
3. Start in foreground using `docker-compose up`. If it works, start in background using `docker-compose up -d`.

### Manually
It requires a postgres database initialized with [these tables](https://github.com/NamelessMC/Nameless-Link/blob/master/postgres-docker/db.sql). You'll need to figure out yourself how to install everything.