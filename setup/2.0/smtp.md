# Setting up SMTP (eg. Gmail or Outlook)
Gmail or SMTP can be set up with Nameless if the default email configuration doesn't work.

In order to do this, head into the `StaffCP -> Configuration -> Email` tab, and enable the `Enable PHPMailer?` option.
The fields below this option need filling out depending on whether you wish to use Gmail or SMTP.

## Gmail
* The username is your Gmail address
* The password is your Gmail account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp.gmail.com`
* The port is `587`
* Enable the Less secure through this link. https://myaccount.google.com/lesssecureapps?pli=1
* (Not always required) Allow access via the captcha https://accounts.google.com/b/0/DisplayUnlockCaptcha

## Outlook / Hotmail / Live
* The username is your email address (e.g. `dave@outlook.com` or `kevin@hotmail.fr`)
* The password is your email account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp-mail.outlook.com` 
* The port is `587`
* The encryption is `TLS`

## Yandex
* The username is your Yandex address
* The password is your Yandex account password
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is `smtp.yandex.ru`
* The port is `587`
* The encryption is `TLS`

## Other SMTP servers
* The username is the email address from your SMTP server
* The password is the password associated with your SMTP email address
* The name field is your site name, or whatever name you want to be displayed in the "From" field in the email
* The host is the hostname of your SMTP server, such as your SMTP server's IP address

There are additional fields within `core/email.php`, including the encryption, however these require manual configuration.

## Enable debugging
Rename `core/classes/Email.php` (NOT `core/email.php`) to something else (like `Email.php.original`). Create a new `Email.php` file with [these contents]( https://gist.githubusercontent.com/samerton/a26df55561f9735eb2f69af6868f57fb/raw/39600339f889e35546daa8a7f9b89788cfa73261/Email.php).

NamelessMC will now print detailed debugging information when it sends an email. Please note that this debug information may contain sensitive data.

To revert, delete `Email.php` and rename `Email.php.original` back to `Email.php`.

## A note on port 465
::: tip Do not use port 465. Your mail server should also allow connecting to port 587, use that instead. `secure` should be set to `tls` in core/email.php.

This port is obsolete, as described in [RFC 8314](https://www.rfc-editor.org/rfc/rfc8314.html#section-7.3):
Historically, port 465 was briefly registered as the "smtps" port. This registration made no sense, as the SMTP transport MX infrastructure has no way to specify a port, so port 25 is always used.  As a result, the registration was revoked and was subsequently reassigned to a different service.  In hindsight, the "smtps" registration should have been renamed or reserved rather than revoked.  Unfortunately, some widely deployed mail software interpreted "smtps" as "submissions" [RFC6409] and used that port for email submission by default when an end user requested security during account setup.  If a new port is assigned for the submissions service, either (a) email software will continue with unregistered use of port 465 (leaving the port registry inaccurate relative to de facto practice and wasting a well-known port) or (b) confusion between the de facto and registered ports will cause harmful interoperability problems that will deter the use of TLS for Message Submission.  The authors of this document believe that both of these outcomes are less desirable than a "wart" in the registry documenting real-world usage of a port for two purposes.  Although STARTTLS on port 587 has been deployed, it has not replaced the deployed use of Implicit TLS submission on port 465.
:::