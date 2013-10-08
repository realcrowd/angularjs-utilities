angularjs-utilities
===================

Hopefully useful directives, providers, filters, etc for AngularJS

This is a repository of all the custom AngularJS components we created that we thought could be helpful to anyone using Angular.

##Included Modules
+ rcForm - This module contains all custom directives, providers, filters, etc. related to forms.
  + rcSubmit - This directive mimics the standard ngSubmit directive, but cancels the submit event if the form isn't valid. It also tracks whether a submission has been attempted on a form.
  + rcVerifySet - This directive enforces that the scope is updated before a form submission on decorated elements. This was created to work with browser plugins like Password Managers that can manipulate the DOM, but may not fire the appropriate events that Angular listens to.

+ rcMailgun - This module contains the custom directive and provider used to configure and use the mailgun api validation service (http://blog.mailgun.com/post/free-email-validation-api-for-web-forms).
  + rcMailgunProvider - This provider allows you to configure the mailgun validation api and get its status.
  + rcMailgunValid - This directive is used in conjuction with the mailgun jQuery plug-in to validate e-mail addressses.

+ rcDisabled - This module contains the custom directive and provider used to easily disable UI elements during long running operations.
  + rcDisabledProvider - This provider allows you to customize the logic used when the UI is being disabled.
  + rcDisabled - This directive so be placed on elements that need to be disabled.

+ rcDisabledBootstrap - This module is just an augmented version of rcDisabled with a custom disable method specifically designed to work with Bootstrap.
