# Language
Nameless-Link chooses which language to use as follows:

If a discord server is connected to a website:
* If the user has linked their account to the website:
    * The user's website language, if supported by Nameless-Link. Otherwise, `DEFAULT_LANGUAGE`.
* Else:
    * The website's default language, if supported by Nameless-Link. Otherwise, `DEFAULT_LANGUAGE`.
* Else:
    * Default language as specified by the `DEFAULT_LANGUAGE` environment variable, set to `en_UK` for the centrally hosted bot.

Please help translate at [translate.namelessmc.com](https://translate.namelessmc.com/projects/namelessmc/discord-bot/)!

<a href="https://translate.namelessmc.com/engage/namelessmc/">
<img src="https://translate.namelessmc.com/widgets/namelessmc/-/discord-bot/multi-auto.svg" alt="Translation status" />
</a>