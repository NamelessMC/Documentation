## Malformed json
Errors:
* `MalformedJsonException`
* `JsonSyntaxException`
* `Use JsonReader.setLenient(true) to accept malformed JSON`
* `Not a JSON Object: null`

Possible solutions and tips:
* The plugin only works on pr13. No other NamelessMC version is supported.
* Make sure you're using the v2 plugin, which can be downloaded here: [stable](https://www.spigotmc.org/resources/nameless-plugin-for-v2.59032) or [beta](https://ci.rkslot.nl/job/Nameless%20Plugin/)
* If use PHP 8, apply this change: https://github.com/NamelessMC/Nameless/commit/443c5e21202fbd8a2b0b850d5be522715c866846
* Are you using CloudFlare? Either use the non-CloudFlare webserver address in config.yml, or find a way to exempt plugin requests from CloudFlare checks. [This CloudFlare support page](https://support.cloudflare.com/hc/en-us/articles/200504045-Using-CloudFlare-with-your-API) may help. [Example rule](https://cdn.discordapp.com/attachments/471036966276825098/678630234685177865/unknown.png)
* Make sure the API is enabled in StaffCP > Configuration > API
* Make sure to update the endpoints as explained in the [installation instructions](https://www.spigotmc.org/resources/nameless-plugin-for-v2.59032/).
* The API URL should be in this format: `http(s)://yoursite.com/index.php?route=/api/v2/API_KEY`.
* `http(s)` means `http` or `https`, do not enter `http(s)`
* Make sure the URL does not redirect. For example, if your website uses `https://` it is very important that the API URL uses `https://` not `http://`
* Go to the address in your browser. Does it work? If it says "invalid api method" somewhere it **works** (invalid API method IS \***NOT**\* AN ERROR).
* Does the plugin error contain "response code 301" (or 302 or 303)? Change http:// to https:// in your API url
* Are you using free webhosting? Don't, they usually block access without providing a way to bypass their filter. Switch to [named hosting](https://namedhosting.com) (with FTP) or [namelesshosting](https://namelesshosting.com) (no FTP) instead.
* Restart your server

## API error 25
The website currently stores data received by the plugin in a suboptimal format ([issue 2179](https://github.com/NamelessMC/Nameless/issues/2179)). As a result, there is a limit to how much data the plugin can send to the website at once. With many groups or multiple online players you will quickly run into this limit. As a temporary workaround, please edit the `nl2_query_results` table to increase `extra` column by changing it from `TEXT` to `MEDIUMTEXT`.

## Placeholders not sending
* Are there any console errors, like the error described in the previous section?
* Did you use `player`? Global placeholders won't work.
* Did you enable `upload-placeholders.enabled`? (NOT the same as `enable-placeholders`, which is for receiving instead of sending!)
* Is `server-id` configured properly?
* Is `server-data-upload-rate` set to a positive number, like `10`?
* Are you online? (placeholders are only sent for online players)
* Does your server use proper UUIDs? You need Mojang UUIDs. Offline mode won't work. If you use BungeeCord/Velocity, make sure it is set up properly so the Spigot servers have valid UUIDs. Bedrock bridges are not supported.
* Does your NamelessMC user have a correct UUID? It may be missing due to a [<pr10 bug](https://github.com/NamelessMC/Nameless/issues/2270) or connection failure. Check in `StaffCP` > `Users` > Your user. If it's missing, click the `Update UUID` button.
* Is PlaceholderAPI installed?
* Did you enter placeholder names like `- this` not like `- %this%`?

## Group sync not working
* Is [Vault](https://dev.bukkit.org/projects/vault) installed?
* Do you use a [Vault](https://dev.bukkit.org/projects/vault)-compatible permissions plugin? We recommend LuckPerms.
* Are there any console errors, like the error described in the previous section?
* Is `server-data-upload-rate` set to a positive number, like `10`?
* Is `server-id` configured properly?
* Are you online? (ranks are only sent for online players)
* Does your server use proper UUIDs? You need Mojang UUIDs. Offline mode won't work. If you use BungeeCord/Velocity, make sure it is set up properly so the Spigot servers have valid UUIDs. Bedrock bridges are not supported.
* Does your NamelessMC user have a correct UUID? It may be missing due to a [<pr10 bug](https://github.com/NamelessMC/Nameless/issues/2270) or connection failure. Check in `StaffCP` > `Users` > Your user. If it's missing, click the `Update UUID` button.

## Plugin says I don't have an account, but I do
Make sure your server uses Mojang UUIDs. This means your server needs to be in online mode, or it needs to be connected to a proxy (BungeeCord) that is in offline mode. Next, please check if your user has a valid UUID on the website. Go to `StaffCP` > `Users` > `(your user)`. If the UUID is missing, click `Edit` > `Update UUID`.

Cracked servers are not supported.
