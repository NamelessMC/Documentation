# Upgrade guide

## Breaking changes:

### PHP 7.4 requirement
- Previously NamelessMC had a requirement of PHP 5.6.
- This will changed with the release of v2.0.0.
- The likihood of your module breaking due to a breaking PHP change is low, but not impossible.
- PHP breaking changes list: https://www.php.net/manual/en/migration56.php

### Strict types in most internal classes
- To take advantage of the newer PHP requirement, we have added strict parameter type checks and return type hints to (almost) all internal classes and methods.
- When interacting with internal NamelessMC classes (`Util`, `Queries`, `User`, etc), please ensure your module is passing a valid values to methods, and that it expects valid results from the methods.
- PHP will throw fatal errors when a type does not match, making this easier to find and fix!
- If you come across any types which you think are incorrect, please let us know!

### `HookHandler` class renamed & method changes
- The class previously named `HookHandler` has been renamed to `EventHandler` to better suite it's purposes.
- Along with this change, some of it's methods have been removed and renamed.
	- Renamed methods:
      - `registerHooks()` -> `registerWebhooks()`
      - `registerHook()` -> `registerListener()`
      - `getHooks()` -> `getEvents()`
  - Removed methods:
  		- `getHook()`
  		- `getParameters()`
  	

### Required `getDebugInfo()` method in `Module` classes
- With the addition of the debug link tool, any classes which extend the `Module` class now must have a function named `getDebugInfo()` which returns an array.
- Whatever information is returned here will be shown to users under your module name when they visit a debug link.
- You can simply return an empty array if you have no special debug info to show.

### `Module::loadPage()` changes
- When your module calls the `Module::loadPage()` method, please note these two changes:
	- The variable previously named `$mod_nav` has been renamed to `$staffcp_nav` within the `Navigation[]` param of the method.
 	- The `$template` variable is now required at the end of the method. It was optional before, so you may not need to add anything.

### Removed allowing to pass `404` to `Redirect::to()` method
- Previously you could call `Redirect::to(404);` to redirect the user to the 404 page, but this functionality has been removed, as it was seldom  used within NamelessMC itself.

### `void` return type added to `WidgetBase->initialize()` method
- Added as part of the 7.4 typing updates. Update your module's widgets as needed.

### `removeGroups()` method removed from `User` class
- Since this was no longer used internally, we remove this potentially dangerous method so modules cannot use it by accident.

### `Util::curlGetContents()` method deprecated
- Moved + renamed for clairity.
- To make HTTP requests, please use the correct method in the new `HttpClient` class.

### `DB->query()` method deprecated
- Renamed for clairity.
- Please use the `DB->selectQuery()` method.

### API route changes
- Please see the API docs for the new routes to use in your applications.

### `Email::send()` method changes
The new usage is as follows:
- array of "email" and "name" strings to determine the recipient
- string email subject
- string email message
- optional array of "email" and "name" strings to define a reply-to address

### `Timeago` class renamed
- Update your code to use the `TimeAgo` class with its corrected capitalization.


---
## API additions:

### `Instancable` class
- Used to easily make a class a singleton.
- Simply extend this class, and your class will get a `getInstance()` method attached to t.
- Example usage in `Placeholders` class.

### `GroupSyncInjector` interface
- With the seperation of Discord features into their own module (Discord Integration), we decided to make the group sync system more modular, meaning your module can now add its own integration to the group sync system!
- Simply implement the `GroupSyncInjector` contract in a class, and register it using the `GroupSyncManager::getInstance()->registerInjector(...)` method in your modules constructor.
- Example usage in the `NamelessMCGroupSyncInjector` class.

### `Util::isModuleEnabled()` method
- To more easily check if a module is enabled, you can call the `Util::isModuleEnabled(string $name)` method.

### `HttpClient` class
- Used for making `GET` or `POST` requests rather than using cURL manually.
- Basic usage:
	```php
  $client = HttpClient::get($url); // or HttpClient::post($url, $data)
  
  if ($client->hasError()) {
  		die($client->getError();
  }
  
  $status = $client->status(); // 200, 404, 500, etc
  
  $data = $client->data();
  ```
 
### `Endpoints::registerTransformer(string $type, Closure $transformer)`
- With the addition of API route binding, you can create custom transformers to use in your Endpoints.
- Example:
	- `"user"` transformer for finding a user by the given ID in the request URL
  	- Used whenever `{user}` appears in an API endpoint URL
    - The User object is loaded for the given user (if it exists), and passed to the Endpoint's `execute(Nameless2API $api, ...);` method!
- Get creative, this can be used for anything =)
	- `"post"` -> get a specific post
  - `"report"` -> get a specific report
  - etc
  
### `Email::addPlaceholder()` method
- Allows modules to add placeholders to email messages.
- Best practice would be to surround the variable with `[SquareBrackets]`.
