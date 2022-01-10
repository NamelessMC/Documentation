# Api

## Using the API
In order to use the API, the API key must be verified. This is done by passing the API key within the URL, as follows:

`example_site.com/api/v2/API_KEY/action`

where `API_KEY` is the API key used, and `action` is the specified action.

All UUIDs returned by the API are without dashes. The API accepts UUIDs both with and without dashes as parameters.

This documentation is for pr12 only.
* pr7: Go [here](https://github.com/NamelessMC/Nameless/wiki/v2-API/8af96b241e0c6a8767c98bc8d190d1847b3ae725)
* pr8-pr12: Please upgrade to pr12. The API has several issues in these versions and lacks documentation.

The API will also return whether there was an error or not, with the `error` field (either true or false). If `true`, there will also be a `message` field containing the error message and sometimes a `meta` field (should be a string but due to a bug sometimes other types) containing more information about the error.

## Actions
### `info` GET
Returns general information about this NamelessMC instance. No parameters required. Response:
* `namelessmc_version` - string: NamelessMC version, e.g. `2.0.0-pr8`
* `version_update` - object (may not be present if no update is availabe)
    * update - whether there is an update available, true or false
    * version - the version for the available update (not present if no update available)
    * urgent - whether the update is urgent (ie a security fix), true or false (not present if no update available)
* `language` - Default language string
* `modules` - array: list of names of enabled modules

Example
```json
{
    "nameless_version": "2.0.0-pr9",
    "language": "EnglishUK",
    "version_update": {
        "update": false
    },
    "modules": [
        "Core",
        "Forum"
    ],
    "error": false
}
```

### `getAnnouncements` GET
Returns all announcements in json. No parameters required. You can optionally add an `id` GET parameter so that only announcements the user should see will be returned
```json
{
  "announcements" : {
    1: {
    	"header": "Announcement!",
      "message" : "This is an example announcement",
      "pages" : ["Home", "Forums"],
      "groups" : [
        0,
        1,
        2,
        3,
        4
      ]
    },
    2: {
      "header": "Staff meeting reminder",
      "message" : "Hello staff, please attend the staff meeting on December 25th at 17:00 UTC.",
      "pages" : ["Home"],
      "groups" : [
        3,
        4
      ]
    }
  },
  "error": false
}
```

### `register` POST
The `register` action will register a specified user. POST body is a JSON object with
* `username` - Forum username
* `uuid` - Minecraft UUID (optional. If Minecraft integration is enabled, the website should get the UUID)
* `email` -  the email address of the user (must be unique)

If there is an issue with the POST request, the API will display an error containing information about the issue.
Otherwise, an email will be sent to the user, asking them to visit the website to complete registration.

TODO: Add error code when minecraft integration is enabled and username is not a minecraft username?

The register method response, if email verification is **disabled**, is as follows:
```json
{
  "message": "Please click on the following link to complete registration:",
  "link": "https://example_site.com/complete_signup/?c=<code>",
  "error": false
}
```

The register method response, if email verification is **enabled**, is as follows:
```json
{
  "message": "Please check your emails to complete registration.",
  "error": false
}
```

### `userInfo` GET
The `userInfo` action will retrieve information about a specified user. Possible GET parameters (choose one):
* `id` - NamelessMC id
* `username` - NamelessMC username
* `uuid` - Minecraft UUID (only if Minecraft integration is enabled)
* `discord_id` - Discord user ID

The output is a JSON object

* `exists` - bool, if false no other values are present
* `id`
* `username`
* `language_id`
* `language`
* `displayname` - (can this be null?)
* `uuid`
* `registered_timestamp`
* `last_online_timestamp`
* `banned` - bool
* `validated - bool, whether the account is verified
* `user_title` - (what is this?)
* `discord_id` - discord user id as string if linked, otherwise null
* `groups` - list of json objects
    * `id`
    * `name`
    * `staff`
    * `order`
    * `ingame_rank_name` - (what happens if it's linked to multiple?)
    * `discord_role_id` - (what happens if it's linked to multiple?)

### `groupInfo` GET
* `id` NamelessMC ID of group 
* `name` NamelessMC name of group. 
Specify multiple times to include multiple groups. When not specified, all groups are listed.

Always ordered by `order`, ascending
```json
{
    "groups": [
        {
            "id": 2,
            "name": "Admin",
            "staff": true,
            "order": 1,
            "ingame_rank_name": "admin",
            "discord_role_id": null
        },
        {
            "id": 3,
            "name": "Moderator",
            "staff": true,
            "order": 2,
            "ingame_rank_name": "mod",
            "discord_role_id": null
        },
        {
            "id": 1,
            "name": "Member",
            "staff": false,
            "order": 3,
            "ingame_rank_name": "member",
            "discord_role_id": null
        },
        {
            "id": 4,
            "name": "Unconfirmed Member",
            "staff": false,
            "order": 4,
            "ingame_rank_name": null,
            "discord_role_id": null
        }
    ],
    "error": false
}
```

### `addGroups` POST
- `user` - the NamelessMC ID of the user
- `groups` - json array of website group IDs to add to this user

### `removeGroups` POST
- `user` - the NamelessMC ID of the user
- `groups` - json array of website group IDs to remove from this user

### `createReport` POST
The `createReport` action will create a report about a given user. The required POST body is a JSON object with the following keys:
- `reporter` - NamelessMC user ID of the user creating the report
- `content` - the reason for the report's creation (max 255 characters)
- `reported` - NamelessMC user ID of the user being reported (optional)
- `reported_username` - a username to display for the user being reported, if `reported` is not provided (optional)
- `reported_uid` - a unique ID for the user being reported, if `reported` is not provided (optional)

Note, if `reported` is not provided, then both `reported_username` AND `reported_uid` must be provided

Errors:
19 - Report content too long
16 - `reporter` or `reported` invalid
21 - `reporter` is banned
26 - `reporter` == `reported`
23 - unable to create report

### `getNotifications` GET
The `getNotifications` action will return a list of alerts a user has. Specify the Nameless ID using the `id` GET parameter.

The method will return error 16 if the user does not exist on the website, otherwise it will return a JSON array with notifications:

Available types:
- `message` - A new private message for the user
- `like` - Someone has liked a post by the user (coming soon)
- `profile_post` - Someone has left a comment on the user's profile
- `profile_post_reply` - Someone has replied to a comment on a profile
- `thread-reply` - Someone has posted in a thread the user is watching (coming soon)
- `follow` - Someone has followed the user (coming soon)
- Please note that modules may add their own notification types, so your application should be able to handle unknown notification types.
```json
{
  "notifications": [
    {
      "message": "Samerton has liked your post",
      "url": "https://example.com/forum/view_topic/?tid=5?post_id=813",
      "type": "like"
    },
    {
      "message": "Partydragen has left a comment on your profile",
      "url": "https://example.com/profile/Derkades/354",
      "type": "profile-comment"
    },
    {
      "message": "Very important",
      "url": "https://example.com/something",
      "type": "message"
    }
  ],
  "error": false
}
```

### `serverInfo` POST
The `serverInfo` action is used by the Minecraft plugin to send server information to the website.

The post body is a JSON object:
```json
{
  "max-memory": 954728448,
  "free-memory": 344910960,
  "allocated-memory": 515899392,
  "tps": 19.99999,
  "server-id": 3,
  "groups": [
    "Admin",
    "Developer",
    "Visitor"
  ],
  "players" : {
    "09948878fe2044e3a07242c39869dd1f" : {
      "ip": "127.0.0.1",
      "name": "Derkades",
      "groups": ["Admin", "Builder"],
      "playtime": 30 (minutes),
      "location": {
        "world": "world",
        "x": -80,
        "y": 64,
        "z": -116
      },
      "placeholders": {
        "player_level": "13"
      }
    },
    "2f778755502c4fb7ae96493d6429e8f3" : {
      "ip": "127.0.0.1",
      "name": "Samerton",
      "groups": ["Developer"],
      "location": {
        "world": "world",
        "x": -541,
        "y": 82,
        "z": 851
       },
       "placeholders": {
         "player_level": "13"
       }
     }
  }
}
```
Only the `server-id` field is required, all others are optional. Specifying `name` for every player is required.


Keep in mind that the requests by the plugin, while they are sent every 10 seconds by default, may be sent more or less frequently.

### `updateUsername` POST
The `updateUsername` action will update the website username of a user with a given NamelessMC ID. The required JSON object is as follows:
- `user` - NamelessMC id
- `username` - new username for user

### `verifyMinecraft` POST
- `user` - NamelessMC ID
- `code` - code to validate user with

### `listUsers` GET
The `listUsers` action provides a list of registered users. No parameters required. Example response:
```json
{
    "users": [
        {
            "id": 1,
            "username": "Aberdeener",
            "uuid": "9490b898856a4aae8de32986d007269b",
            "banned": false,
            "verified": true,
            "discord_id": 0
        },
        {
            "id": 2,
            "username": "PaperMC",
            "uuid": "31ad5809b8b946e899ed1d0ff3cd25f4",
            "banned": false,
            "verified": true,
            "discord_id": 0
        }
    ],
    "error": false
}
```

`uuid` may be left out if Minecraft integration is disabled. 
Possible filter parameters:
* `banned` (boolean)
* `verified` (boolean)
* `discord_linked` (boolean)
* `group_id` (integer)
* `operator` (`'AND'` (default) or `'OR'`) - Whether all filters must apply (AND) or at least one (OR) 

### `submitDiscordRoleList` POST
Post body is json object with a key "roles" and value is another json array of objects. Each object has an `id` and `name` key for the discord role ID and name, respectively.

### `updateDiscordBotSettings` POST
Updates discord bot settings. Not all parameters below have to be present, it is possible to only change one setting by specifying one parameter.
- `url` - New Discord bot URL
- `guild_id` - New Discord server ID to be associated with your website (as a string)
- `bot_username` Username#1234 of this bot
- `bot_id` Discord user ID of the bot (as a string)

errors:
* 31 if not at least one setting is specified

### `verifyDiscord` POST
Link a discord account with the website. Post body is verification token in plain text.
- `token` - Discord verification token
- `discord_id` - Discord ID (AS A STRING)
- `discord_username` - Discord username

Error codes?

### `updateDiscordUsernames` POST
- `users` array of json objects:
    - `id` discord user id
    - `name` discord username

Error codes?

### `getDiscordRoles` GET
GET param `user` (NamelessMC ID). Response `roles` json array of role ids

Error codes?

### `setDiscordRoles` POST
POST body JSON object:
- `user` - NamelessMC id
- `roles` - Json array of discord role ids

Error codes?

### `addDiscordRoles` POST
- `user` - NamelessMC id
- `roles` - discord role ids


### `removeDiscordRoles` POST
- `user` - NamelessMC id
- `roles` - discord role id. Website will not return an error if the user never had this role.

### `banUser` POST
- `user` - NamelessMC user id of user to ban

## Error Codes
Whenever an error is returned, `code` and `message` fields will be returned, sometimes a `meta` (should be a string but due to a bug sometimes other types) field will be added which contains more detailed error information. The message can be in a variety of languages, depending on the active translation on the website, so the code corresponds to a certain type of error. The error codes and their meaning are listed below.

`0` - Unknown error

`1` - Invalid API key

`2` - Invalid language file

`3` - Invalid API method

`4` - No unique site ID available

`5` - Unable to check for updates

`6` - Invalid POST / GET contents

`7` - Invalid email address

`8` - Invalid username

`9` - Invalid UUID

`10` - Email already exists

`11` - Username already exists

`12` - UUID already exists

`13` - Unable to create account

`14` - Unable to send registration email, please contact an admin to activate your account

`15` - cURL error

`16` - Unable to find user

`17` - Unable to find group

`18` - Unable to update user's group

`19` - Report content is greater than 255 characters

`20` - (not used)

`21` - User creating report has been banned from website

`22` - User already has an open report regarding the reported player

`23` - Unable to create report

`24` - Unable to update (Discord or website) username

`25` - Unable to update server info

`26` - Cannot report youself

`27` - Invalid server ID

`28` - Invalid validation code

`29` - Unable to set user's Discord ID

`30` - Unable to set Discord bot URL endpoint

`31` - (not used)

`32` - User already active

`33` - Unable to set Discord Guild ID

`34` - Discord integration is disabled

## Future Additions
### `createTopic` POST
The `createTopic` action is used to create a new topic on the website, in a specified forum.
### Posting announcements