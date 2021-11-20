# Environment variables
## Basic settings
| Variable | Description
| - | -
`BOT_URL` | URL which the website can use to reach this bot, for example `http://localhost:27362` (so the URL of the bot webserver, not the website URL)
`WEBSERVER_PORT` | Port to run bot webserver on, for example 27362
`WEBSERVER_INTERFACE` | Default `127.0.0.1`*, interface to bind the webserver to. *Defaults to `0.0.0.0` in docker for obvious reasons.
`DISCORD_TOKEN` | Discord bot API token, create one in [Discord developer console](https://discord.com/developers/applications/)
`API_URL` | API URL, stateless mode only. See StaffCP > Configuration > API
`GUILD_ID` | Guild id, stateless mode only
`DEFAULT_LANGUAGE` | Default language when the user has not set their own language or it could not be retrieved. See [this directory](https://github.com/NamelessMC/Nameless-Link/tree/master/src/main/resources/languages) for a list of languages, enter the language code without .json (default `en_UK`)

## Advanced
| Variable | Description
| - | -
`STORAGE_TYPE` | `stateless` or `postgres`
`POSTGRES_HOSTNAME` | default `localhost`
`POSTGRES_PORT` | default `5432`
`POSTGRES_NAME` | database name
`POSTGRES_USERNAME` |
`POSTGRES_PASSWORD` | 
`DISABLE_MEMBERS_INTENT` (2.0+) | Set (to anything) to disable members intent requirement. Group sync will break.
`UPDATE_SETTINGS_THREADS` (2.0+) | numbers of threads to use for updating bot settings at startup. Default 2. <v2.0 always uses 10.
`SHARDS` (2.0+) | Amount of shards to use, default is 1

## Legacy
| Variable | Description
| - | -
`SKIP_SETTINGS_UPDATE` (<=2.0) | Set to anything to stop the bot from sending settings to connected websites. Useful for large bot instances. Removed in 2.1, the settings update code now also sends slash commands for a guild to discord and this shouldn't be disabled.
`DEFAULT_COMMAND_PREFIX` (1.2-2.0 only) | Command prefix to use when not configured per guild. In stateless mode, this default will always be used. "!" is used if not configured. Removed in 2.1 because of the migration to slash commands.