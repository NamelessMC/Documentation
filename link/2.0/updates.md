# Updates
List of breaking changes or database migrations in each update

## 1.0 series
### 1.0 to 1.1
New `WEBSERVER_BIND` variable that defaults to `127.0.0.1`. If you need it to bind to all interfaces (can be insecure!), set it to `0.0.0.0` (previous default). 

### 1.1 to 1.2
For database installations, add a new column to your connections table, for example:
```
docker-compose exec postgres psql -U <username> <database> --command "ALTER TABLE connections ADD COLUMN command_prefix TEXT DEFAULT NULL;"
```
No changes required for stateless installations.

### 1.2 to 2.0
* Breaking change to `roleChange` endpoint, requires website update (compatible with pr10+)
* Postgres variable names changed to be consistent with [library/postgres](https://hub.docker.com/_/postgres)
    * `POSTGRES_USERNAME` -> `POSTGRES_USER`
    * `POSTGRES_NAME` -> `POSTGRES_DB`
* Members intent now required (unless `DISABLE_MEMBERS_INTENT` is set)

## 2.0 to 3
* You'll need to re-invite the bot, with slash commands permissions
* Environment variables `SKIP_SETTINGS_UPDATE` and `DEFAULT_COMMAND_PREFIX` were removed
* The `command_prefix` column in the `connections` table is no longer used, feel free to remove it.