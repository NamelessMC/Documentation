### What do we store?
Your discord server id, website api url and a timestamp when it was last used.

### Where?
In a postgresql database on a server hosted by OVH in Germany. The data is also backed up to several off-site locations (encrypted client-side).

### For how long?
The data is immediately deleted if you run the !unlink command. It is also deleted within a couple weeks if you kick the bot from your server. However, the data may stick around for a while in encrypted backups (up to a year). 

### Can my data be deleted immediately from backup?
No, we do not delete backups before they naturally expire. Please change your API key instead.

### What do you use it for?
Strictly only for required bot functionality. Please explore the source code in this repository if you are curious. We do not perform any additional data analytics or processing on the data and do not share it with anyone else. Only a single person has access to the server ([@Derkades](https://github.com/Derkades)).