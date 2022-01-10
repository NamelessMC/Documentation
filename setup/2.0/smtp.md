# Setting up SMTP (eg. Gmail or Outlook)
Gmail or SMTP can be set up with Nameless if the default email configuration doesn't work.

In order to do this, head into the `StaffCP -> Configuration -> Email` tab, and enable the `Enable PHPMailer?` option.
The fields below this option need filling out depending on whether you wish to use Gmail or SMTP.

## Gmail
* The username is your Gmail address
* The password is your Gmail account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp.gmail.com`
* Enable the Less secure through this link. https://myaccount.google.com/lesssecureapps?pli=1
* (Not always required) Allow access via the captcha https://accounts.google.com/b/0/DisplayUnlockCaptcha

## Outlook / Hotmail / Live
* The username is your email address (e.g. `dave@outlook.com` or `kevin@hotmail.fr`)
* The password is your email account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp-mail.outlook.com` 
* The port is `587`
* The encryption is `STARTTLS`

## Yandex
* The username is your Yandex address
* The password is your Yandex account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp.yandex.ru`
* The port is `465`
* The encryption is `SSL`

## Other SMTP servers
* The username is the email address from your SMTP server
* The password is the password associated with your SMTP email address
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is the hostname of your SMTP server, such as your SMTP server's IP address

There are additional fields within `core/email.php`, including the encryption, however these require manual configuration.

## Enable debugging
Rename `core/classes/Email.php` (NOT `core/email.php`) to something else (like `Email.php.original`). Create a new `Email.php` file with [these contents](https://gist.githubusercontent.com/samerton/a26df55561f9735eb2f69af6868f57fb/raw/39600339f889e35546daa8a7f9b89788cfa73261/Email.php).

To revert, delete `Email.php` and rename `Email.php.original` back to `Email.php`.