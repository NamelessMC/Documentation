# Setup

::: danger
Requires [NamelessMC v2 pre-13](https://github.com/NamelessMC/Nameless).
:::

## Invite the bot to your guild & Discord setup

1. Invite the bot using [this](https://namelessmc.com/discord-bot-invite) link. 
::: warning
You are required to have the "Manage Roles" permission in the guild in order to invite the bot.
:::
2. Run the command `/apiurl <api url>` in your Discord server (not in DMs!). You can find the API URL in `StaffCP > Configuration > API`.
3. You can now enable Discord integration in `Panel > Integrations > Discord`.

::: tip
By using the invite link above you use our Nameless-Link bot instance. This means we store your website API key, see [this page](/link/2.0/official-data.html) for more information. If you know a thing or two about systems administration you might want to [host the bot yourself](/link/2.0/install.html).
:::

## Link NamelessMC and Discord accounts

In order for Discord to know which website user is associated with each discord member, people who wish to have their ranks synced must link their accounts using the following steps.

1. Open `Account > Profile Settings` and click `Link` in the Discord link section.
2. Follow the instructions and send the specified command to the bot.

If you ever change your Discord username, you can update it on the website using the `!updateusername` command. This command has to be run in a Discord server, not in a DM to the bot. Username sync may be done automatically in the future.

## Group sync
In order for the bot to know which Discord role to assign to each NamelessMC group, you must setup the [Discord Role ID](https://discordhelp.net/role-id) for any groups you want to sync. To do this, open Panel > Configuration > API > Group Sync and match Discord roles to NamelessMC groups.

::: warning
Make sure the bot role is set to be higher than the highest role you want the bot to manipulate. For example, if you want the bot to be able to sync all roles, drag the bot role all the way to the top. For security reasons it is recommended to leave it below any admin or moderator roles with dangerous permissions. This way, if a malicious person compromises the bot they won't have full access to your Discord server.
:::

Roles are synced in both directions.