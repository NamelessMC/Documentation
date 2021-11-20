### `GET` `/status`
responses:
* `success`

### `POST` `/roleChange` (1.0-1.2)
request (json object):
* `guild_id` - Discord guild id
* `user_id` - Discord user id
* `api_key` - Website API key
* `remove_role_id` - Id of role to add to this user
* `add_role_id` - Id of role to remove from this user

responses:
* `badparameter` - Missing or invalid parameter, see above
* `error` - Bot internal error, not the API caller's fault
* `invguild` - Guild does not exist or bot is not in guild
* `invuser` - User does not exist or is not in specified guild
* `notlinked` - Bot is not linked to website for this guild
* `unauthorized` - Invalid API key
* `invrole`
* `hierarchy` - Just a warning, not an error. Means that the bot could not add/remove roles because they are higher than the bot role. If multiple roles are specified (add and remove) the other may have been changed successfully. 
* `success`


### `POST` `/roleChange` (2.0)
request (json object):
* `guild_id` - Discord guild id
* `user_id` - Discord user id
* `api_key` - Website API key
* `roles` - array of objects
    * `id` - role id
    * `action` - 'add' or 'remove'

responses:
* `badparameter` - Missing or invalid parameter, see above
* `error` - Bot internal error, not the API caller's fault
* `invguild` - Guild does not exist or bot is not in guild
* `invuser` - User does not exist or is not in specified guild
* `notlinked` - Bot is not linked to website for this guild
* `unauthorized` - Invalid API key
* `partsuccess` - Just a warning, not an error. Means that the bot could not add/remove some roles because they are higher than the bot role or the role id is invalid. If multiple roles are specified, others may have been changed successfully. 
* `fullsuccess` - All roles have been added/removed successfully