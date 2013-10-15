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

+ rcWizard - This module contains the directives used to configure and use a Wizard UI. It is dependent on the unofficial third-party jQuery Bootstrap Wizard Plug-in (http://vadimg.com/twitter-bootstrap-wizard-example/) which in turn is dependent on the official Bootstrap "Tabs" jQuery Plug-in (http://getbootstrap.com/javascript/#tabs).
  + rcWizard - This directive configures and manages all the wizard behavior.
  + rcStep - This directive is used when advanced features are required at the step level. It is not required for basic functionality


##License
Copyright (c) 2013 RealCrowd
http://www.realcrowd.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
