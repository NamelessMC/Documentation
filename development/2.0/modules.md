# Modules

### Greetings, developer!

This guide assumes intermediate PHP knowledge. If you do not know PHP and want to make NamelessMC modules, we highly recommend you learn the basics first - rather than jumping right into this.

## First Steps

### Module File Layout
Below is an *example* of how most NamelessMC modules are laid out in terms of files, **not** including any extra folders (Such as `classes/`) you may use for your own organization.
```
- modules/
    - DemoModule/
        - init.php
        - module.php
        - hooks/
            - <hook classes>
        - includes/
            - admin_widgets/
                - <widget settings files>
            - endpoints/
                - <EndpointBase classes>
        - pages/
            - <frontend page files>
            - panel/
                - <StaffCP page files>
        - widgets/
            - <WidgetBase classes>
- custom/
    - templates/
        - DefaultRevamp/
            - DemoModule/
                - <frontend Smarty files>
```

All modules require at least one file to work, named `init.php`. 
This file must be placed in `modules/<your module name>/init.php`.
Each time a page loads, NamelessMC will detect this file and execute the code inside of it automatically.

It is recommended to separate your `init.php` file and your module's main class, most people make the main class in a file called `module.php`.

In your `init.php` file, you must create a new instance of your module's main class, which ***must*** extend the `Module` class.

### Bare Minimum Module
```php
<?php
// Demo module by Aberdeener
// init.php file

require_once ROOT_PATH . '/modules/DemoModule/module.php';
$module = new Demo_Module();
```
```php
<?php
// Demo module by Aberdeener
// module.php file

class Demo_Module extends Module {

    public function __construct() {

        $name = 'Demo Module';
	$author = 'Aberdeener';
	$module_version = '0.0.1';
	$nameless_version = '2.0.0-pr9';

	parent::__construct($this, $name, $author, $module_version, $nameless_version);
    }

    public function onInstall() {
    }

    public function onUninstall() {
    }

    public function onEnable() {
    }

    public function onDisable() {
    }

    public function onPageLoad($user, $pages, $cache, $smarty, $navs, $widgets, $template) {
    }

}
```
You will notice that when your module's main class extends the `Module` class, it is required to have some functions in it.
These functions are as follow:
- `onInstall();`
- `onUninstall();`
- `onEnable();`
- `onDisable();`
- `onPageLoad();`

Their names are fairly understandable, they will each be called when that action happens.
Obviously, most of your module's core code will be in the `onPageLoad();` function, as that is called *every* time a page is loaded.

In your module's constructor, this is where you will want to:
- Initiate your module's information variables (name, author, version, etc)
- Add your pages to NamelessMC's page system
- Set your module's required variables which are **not** provided in the `onPageLoad();` function (Endpoints, Queries, etc)
- Add your module's hooks to NamelessMC's hook system

In the `onPageLoad();` function, you will want to:
- Add your permissions to NamelessMC's permission system
- Add a sitemap method
- Add your pages to the navigation bars
- Initiate your module's widgets
- Initiate your module's API endpoints (See the `Util::loadEndpoints($path, $endpoints);` function in the [`Util` class](https://github.com/NamelessMC/Nameless/wiki/Nameless-2.0-Module-Developer-Documentation#util))

More detail about your module's constructor:
- There are no required parameters.
- It must construct the parent `Module` class, and pass:
    - itself (`$this`)
    - the name of the module
    - the version of the module
    - the minimum NamelessMC version required (In the format `2.0.0-prX` where `X` is the pre-release number), this is used to warn users if they have modules which may not work with their version of NamelessMC.
    - If you do not construct the parent class, your module will not be be registered and all your code will seem to have no effect.

More detail about the `onPageLoad();` function:
- Called each time a page is loaded, usually it is one of the last things done before the template is rendered by [Smarty](https://www.smarty.net/).
- All parameters are required, obviously you don't need to use them all.
- Parameters:
    - `$user` the currently logged in user.
    - `$pages` instance of `Pages` class - same one you used to add pages in the constructor.
    - `$cache` instance of the `Cache` class. See the `Cache` section below for more information.
    - `$smarty` instance of the Smarty template engine - usually not touched or used by modules.
    - `$navs` array of instances of the `Navigation` class. See the `Navigation` section below for more information.
    - `$widgets` instance of `Widgets` class. See the `Widgets` section below for more information.
    - `$template` instance of template main class which extends `TemplateBase`. Rarely used, defaults to `null`. Used more by pages than modules.

## Useful classes and some of their functions
*Note: All of these classes are located in `/core/classes/` under the exact same name if you would like to learn more about them, as not all of their functions are listed here.*
### `Queries`
   - More user friendly abstraction of the `DB` class to get and set data in the NamelessMC database.
   - Useful functions:
       - `update($table, $id, $fields);`
       - `getWhere($table, $where);`
### `DB`
   - "Raw" access to the NamelessMC database.
   - Useful functions:
      - `getInstance();`
         - Returns the current instance of the class, creates a new instance if there is not yet one.
      - `insert($table, $fields);`
         - Inserts a new row to `$table` using `$fields` as a `column => value` map.
         - `$fields` must be an array in the following format:
           ```php
           // Column name => value
           $fields = array(
               'wiki_title' => 'First Wiki Article!',
               'wiki_content' => 'Greetings, everyone!',
               'wiki_author' => $user->data()->id
           );
           ```
### `Cache`
   - Store data in text files for specific periods of time for quicker and easier access when compared to the database.
   - Useful functions:
      - `setCache($name);`
         - Set your current `$cache` file. Useful for organizing data into different files, rather than one file for all information.
      - `isCached($key);`
         - Returns true/false depending if `$key` is cached in the current file (whatever was last set as the cache via `setCache($name);`).
      - `retrieve($key);`
         - Retrieves object under the key `$key` in the current cache file, or `null` if it does not exist.
      - `store($key, $value, $expiration = 0);`
         - Stores `$value` object with the key `$key` and sets it to expire in `$expiration` seconds in the current cache file.
         - If `$expiration` is not provided, it will never expire.
### `Pages`
   - Used to register/add pages to the NamelessMC page system. Pages will then show up for things like Announcements, Widgets, etc.
   - Useful functions:
      - `add($module, $url, $file, $name = '', $widgets = false);`
         - Add a page into the NamelessMC page system.
         - Creates a page owned by the module named `$module` (`$module` is the name of your module, **not** an instance of it), with path of `$url`, and the file `$file` (`$file` is a path to the PHP file which will be executed when a user visits your page).
         - `$name` is optional, but recommended so your page can be recognized easier in lists of pages.
         - `$widgets` is a boolean value whether `Widgets` can be present/enabled on this page.
### `Navigation`
   - Often used in `onPageLoad();` as an array of `$navs`, this let's your module add links to pages to navigation sections.
   - Sections:
      - `$navs[0]` top navigation bar on frontend.
      - `$navs[1]` user dropdown on frontend.
      - `$navs[2]` StaffCP nav sidebar.
   - Useful functions:
      - `add($name, $title, $link, $location = 'top', $target = null, $order = 10, $icon = '');`
         - Adds a link to this navigation section (see above Sections)
### `Language`
   - Allows modules to get/set phrases in a specific locale.
   - Useful functions:
      - `get($file, $term);`
         - Returns the string with the key `$term` in the specified language file `$file`.
         - If the `$term` is not in the `$file`, it will try to find it in the EnglishUK file (as this is the default language used by NamelessMC developers. If it is not in the EnglishUK file, it will return `"Term $term not set"`.
      - `set($file, $term, $value);`
         - Set (or update) the `$term` in `$file` to `$value`.
         - Used internally for email message editing via StaffCP.
### `Widgets`
   - Allows modules to add widgets to NamelessMC's widget system.
   - Widget developer documentation is coming soon:tm:.
   - Useful functions:
      - `add($widget);`
         - Add `$widget` to the widget system.
         - `$widget` must be an instance of a class which extends the `WidgetBase` class.
      - `getPages($name);`
         - Returns an array of page names that the widget named `$name` is enabled on.
### `Endpoints`
   - Used to add API endpoints to NamelessMC's v2 public API, which can then be used for external applications (Minecraft plugin, Discord bot, etc)
   - Useful functions:
      - `add($endpoint);`
        - Similar to `$widgets->add($widget);`, `$endpoint` must be an instance of a class which extends `EndpointBase`.
      - `handle($request, $api);`
        - Finds an `EndpointBase` thats route matches `$request` (Example request/route: `userInfo`), and `execute()`s it, passing `$api` for an easily accessible instance of the v2 API class `Nameless2API`.
### `PermissionHandler`
   - Register and get permissions from NamelessMC's core permission system.
   - Useful functions:
     - `registerPermissions($section, $permissions);`
       - Add permissions to the `$section` section. `$section` is used to separate permissions into different groups in StaffCP. Feel free to make `$section` the name of your module, or set it to `$language->get('moderator', 'staff_cp')` so your permissions fit in with all default permissions.
       - `$permissions` must be an array in the following format:
         ```php
         // Permission value => Friendly title
         $permissions = array(
             'demo_module.add_user' => 'Add user',
             'demo_module.delete_user' => 'Delete user'
         );
         ```
### `User`
   - Refers to a user on the NamelessMC website.
   - Usually the logged-in user accessible via `$user`.
   - Useful functions:
      - `data();`
         - Returns an object of all the columns in `nl2_users` with the `id` of the current `$user`.
         - Often used to get their username: `$user->data()->username`
      - `hasPermission($permission);`
         - Returns true/false if the `$user` has the `$permission`.
### `HookHandler`
   - Register events and hooks for specific events into NamelessMC's hook system.
   - Useful functions:
     - `registerEvent($event, $description, $params = array());`
       - Create a new event callable via `$event` with description `$description` and params as `$params`.
       - If `$params` is defined, it must be an array in the following format:
           ```php
           // Param name => Param description
           $params = array(
               'user_id' => 'ID of the user to ban.',
               'reason' => 'Reason to display to banned user.'
           );
           ```
     - `registerHook($event, $hook);`
        - Add a hook/function to the event named `$event` (created in `registerEvent();` function).
        - `$hook` must be a string in the following format (as per [call_user_func](https://www.php.net/manual/en/function.call-user-func.php) requirements):
           - `ClassName::staticMethod`
     - `executeEvent($event, $params = null);`
        - Executes the hook function for the event named `$event`, and passes `$params` as parameters to the function.
        - Uses [call_user_func](https://www.php.net/manual/en/function.call-user-func.php) to call hook functions, so if you're having weird errors related to that, please read their documentation before asking for support.
### `Util`
   - Provides some helpful functions for general usage.
   - Useful functions:
     - `loadEndpoints($path, $endpoints);`
        - `$path` must be a string which directly points to a folder where your module's endpoints are located.
        - `$endpoints` is the global instance of the [`Endpoints` class](https://github.com/NamelessMC/Nameless/wiki/Nameless-2.0-Module-Developer-Documentation#endpoints)
## Advanced Example Module Main Class
```php
<?php
// Demo module by Aberdeener
// module.php file

class Demo_Module extends Module {

    protected 
        $_language,
        $_queries;  

    public function __construct($language, $queries) {

        $name = 'Demo Module';
	$author = 'Aberdeener';
	$module_version = '0.0.2';
	$nameless_version = '2.0.0-pr9';

	parent::__construct($this, $name, $author, $module_version, $nameless_version);

        $this->_language = $language;
        $this->_queries = $queries;

    }

    public function onInstall() {
        $queries = $this->_queries;
        if (!count($queries->tableExists('wiki_articles'))) {
            $queries->createTable('wiki_articles', "`id` INT(11) NOT NULL AUTO_INCREMENT, `content` VARCHAR(102) NOT NULL, `user_id` INT(11) NOT NULL", "");
        }
        if (!count($queries->tableExists('wiki_user_stats'))) {
            $queries->createTable('wiki_user_stats', "`id` INT(11) NOT NULL AUTO_INCREMENT, `user_id` INT(11) NOT NULL, `wiki_articles` INT(11) NOT NULL", "");
        }
    }

    public function onUninstall() {
    }

    public function onEnable() {
    }

    public function onDisable() {
    }

    public onPageLoad($user, $pages, $cache, $smarty, $navs, $widgets, $template) {

        PermissionHandler::registerPermissions('Demo Module', array(
            'demo_module.view_wiki' => 'View the wiki',
            'demo_module.create_wiki_page' => 'Create wiki page',
            'demo_module.delete_wiki_page' => 'Delete wiki page',
        ));

	$pages->add('Demo Module', '/wiki', 'pages/wiki.php');
	$pages->add('Demo Module', '/panel/wiki', 'pages/panel/wiki.php');

	$cache->setCache('navbar_order');
	if(!$cache->isCached('wiki_order')){
	    $order = 3;
	    $cache->store('wiki_order', $order);
	} else {
	    $order = $cache->retrieve('wiki_order');
	}

	$cache->setCache('navbar_icons');
	if(!$cache->isCached('wiki_icon')) {
            $icon = 'fa fas-book';
            $cache->store('wiki_order', $icon);
        } else {
            $icon = $cache->retrieve('wiki_icon');
        }

	$language = $this->_language;

        // Add a page to the top navigation bar
        $navs[0]->add('wiki', $language->get('wiki', 'wiki'), URL::build('/wiki'), 'top', null, $order, $icon);

        if ($user->hasPermission('demo_module.create_wiki_page')) {
            // Add page to StaffCP side panel
            $navs[2]->add('create_wiki', $language->get('wiki', 'create_wiki'), URL::build('/wiki/create'));
        }

        require_once ROOT_PATH . '/modules/DemoModule/widgets/DemoWidget.php';
	$widget_pages = $widgets->getPages('Demo Widget');
        $demo_widget = new Demo_Widget($widget_pages);
        $widgets->add($demo_widget);

        $queries = $this->_queries;
        $wiki_article_count = count($queries->getWhere('wiki_articles', array('user_id', '=', $user->data()->id)));

        $fields = array(
            'user_id' => $user->data()->id,
            'wiki_articles' => $wiki_article_count
        );
        DB::getInstance()->insert('wiki_user_stats', $fields);
    }

}
```

## FAQ:
- How do I check if the user is on the frontend or backend?
    - To check if the user is on the frontend: `if (defined('FRONT_END'))`
    - Similarly for backend: `if (defined('BACK_END'))`
- How do I add pages to StaffCP?
    - Use the [`Pages` class](https://github.com/NamelessMC/Nameless/wiki/Nameless-2.0-Module-Developer-Documentation#pages) to create all of the StaffCP pages you'd like in your module's constructor
    - Use the [`Navigation` class](https://github.com/NamelessMC/Nameless/wiki/Nameless-2.0-Module-Developer-Documentation#navigation) to add your pages to the StaffCP navigation sidebar (`$mod_nav`/`$nav[2]`)
- Help! My module isn't working.
    ![HELP](https://i.imgur.com/VCpB7Lg.png)
    - We would love to help you out, but we will need information from you in order to best assist you.
    - Read [this](https://www.freecodecamp.org/news/how-to-ask-good-questions-as-a-developer-9f71ff809b63/) so you know how to ask a good question, and then feel free to get help in our [Discord server](https://discord.gg/QWdS9CB).
