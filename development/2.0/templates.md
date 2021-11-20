# Templates

### Starter guide for creating your own template for Nameless v2

If you would like to create a template for Nameless v2 follow the steps below.

## Step by Step Guide
1. Go to `/custom/templates` and copy/paste the `DefaultRevamp` folder, and then rename the copied folder to the name of your template.
2. Navigate to your template folder (`/custom/templates/your-template`), and find `template.php` file, there edit the following:
  * At lines [12](https://github.com/NamelessMC/Nameless/blob/v2/custom/templates/DefaultRevamp/template.php#L12) and [153](https://github.com/NamelessMC/Nameless/blob/v2/custom/templates/DefaultRevamp/template.php#L153) rename `DefaultRevamp_Template` to `YourTemplate_Template`.
  * At lines [17-22](https://github.com/NamelessMC/Nameless/blob/v2/custom/templates/DefaultRevamp/template.php#L27-L30) change values to values of your template name and yourself.
3. After you're finished with the steps above, in your website navigate to `StaffCP > Layouts > Templates`, and click "Install", after that you should be able to see your template.
4. Active it by clicking "Enable" and "Make Default".
5. That's it, now feel free to edit the HTML in .tpl files, CSS, JS, fonts and other files in the appropriate files in your template folder.

## Additional Notes
1. You can edit CSS imports at lines [40-42](https://github.com/NamelessMC/Nameless/blob/v2/custom/templates/DefaultRevamp/template.php#L40-L42) (`addCSSFiles` array), and JS imports at lines [46-49](https://github.com/NamelessMC/Nameless/blob/v2/custom/templates/DefaultRevamp/template.php#L46-L49) (`addJSFiles` array).
2. When adding your own CSS or JS framework (or using the existing ones), don't write your code in CSS/JS files of those frameworks, instead create your own (or use existing) files where you overwrite/use the code.