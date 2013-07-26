angular.module('LoginApp', ['rcMailgun'])

.config(['rcMailgunProvider', function (rcMailgunProvider) {
  
        var mailgunOptions = {
          api_key: '40733976039a7f5c8193eea7618d0313aababe20',
          in_progress: null,
          success: null,
          error: null,
        };
        
        rcMailgunProvider.configure(mailgunOptions);
    }]);