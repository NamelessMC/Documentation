# Installation
## Basics
::: danger
Please read carefully.
This plugin does not support BungeeCord! Install it on every spigot server where you want NamelessMC commands. For group sync it's fine to just install it on the hub server.
:::

1. Put the plugin in your `plugins` folder and restart/reload.
2. Go to the plugin folder and edit `config.yml`.
3. Enter the API URL.
4. `/nlpl reload`


::: tip Check
Check if basic commands are working (e.g. `/info`). If they do, move on.
:::

1. For every server with this plugin installed, create a Minecaft server in StaffCP if you haven't done so already.
2. Copy the server's ID.
3. Set `server-id` in `config.yml` to this server id.
4. `/nlpl reload` again.

The plugin can now send rank updates and placeholders to the website

## Group sync
::: danger
This (and every other part of the plugin) will not work if your server is in offline mode! If your servers are in offline mode for BungeeCord that's fine, as long as you enable bungeecord in spigot.yml, enable IP forwarding in bungeecord and set the bungeecord server to online mode.
:::

### Enable server data sender
The server data sender sends information about the server and online players to the website. That includes ranks, so to sync ranks the server data sender needs to work. In the website control panel, add the spigot server (Integrations > Minecraft > Minecraft Servers). NamelessMC will give the server an ID. Set `server-id` in `config.yml` to this ID.

### Mapping server groups to website groups
In the website control panel (`StaffCP > Configuration > API > Group sync`), configure which server groups correspond to which website groups. Any groups that you do not add here will not be synced.