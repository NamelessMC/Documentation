# OAuth Configuration
## Discord
1. [Register a developer application](https://discord.com/developers/applications) and retrive your client ID and client secret.
2. Put it in the inputs for Discord (StaffCP > Configuration > Registration).
3. Fill out the Redirects (**make sure to replace `nameless.test` with your domain!**):
	- ![oauth-discord.png](/images/oauth-discord.png)

## Google
1. Open the [Google API Console Credentials page](https://console.developers.google.com/apis/credentials).
2. Click **Select a project**, then **NEW PROJECT**, and enter a name for the project, and optionally, edit the provided project ID. Click **Create**.
3. On the Credentials page, select **Create credentials**, then **OAuth client ID**.
4. You may be prompted to set a product name on the Consent screen; if so, click **Configure consent screen**, supply the requested information, and click **Save** to return to the Credentials screen.
5. Select **Web Application** for the **Application Type**. Follow the instructions to enter JavaScript origins, redirect URIs, or both.
6. Click **Create**.
7. Fill out the Authorized redirect URIs (**make sure to replace `localhost` with your domain!**):
	- ![oauth-google.png](/images/oauth-google.png)
8. On the page that appears, copy the **client ID** and **client secret** to your clipboard, then put it in the inputs for Google (StaffCP > Configuration > Registration).
