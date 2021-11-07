# Installation

::: danger
Please read carefully.
This plugin does not support BungeeCord! Install it on every spigot server where you want NamelessMC commands. For group sync it's fine to just install it on the hub server.
:::

1. Put the plugin in your `plugins` folder and restart/reload.
2. Go to the plugin folder and edit `config.yml`.
3. Enter the API URL.
4. `/nlpl reload`

Check if basic commands are working (e.g. `/info`). If they do, move on.

1. For every server with this plugin installed, create a Minecaft server in StaffCP if you haven't done so already.
2. Copy the server's ID.
3. Set `server-id` in `config.yml` to this server id.
4. `/nlpl reload` again.

The plugin can now send rank updates and placeholders to the website