/**
 * @ngdoc provider
 * @name ng.provider:rcMailgunProvider
 *
 * @description
 * configure the mailgun api and directive
 * adding to the scope so the attempt flag can be referenced in markup.
 *
 */
var rcMailgunProvider = { 'rcMailgun': function () {
    
	var configuredOptions = {};
    
      this.configure = function(options) {
        configuredOptions = options;
      };
      
      this.$get = function () {
			return {
				getOptions: function() {
					return configuredOptions;	
				},
        		mailgunStatus: ''
			};
		};
	}
};

/**
 * @ngdoc directive
 * @name ng.directive:rcMailgunValid
 *
 * @description
 * Used to track submit attempts on forms. It mimics the ngFormController by
 * adding to the scope so the attempt flag can be referenced in markup.
 *
 */
var rcMailgunValidDirective = {
    'rcMailgunValid': ['rcMailgun', function (rcMailgun) {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attributes, modelController) {
            
          if (!jQuery().mailgun_validator) {
            console.log('jQuery mailgun_validator plugin required')
          }
          
          options = rcMailgun.getOptions();
          
          options = options || {};
          
          var baseSuccessCallback = options.success;
          var baseErrorCallback = options.error;
          var baseInProgressCallback = options.in_progress;
          
          var successWrapper = function(data) {
            modelController.$setValidity('rcMailgunInProgress', true); 
            modelController.$setValidity('rcMailgunFinished', true);						
            modelController.$setValidity('rcMailgunEmailValid', (data && data.is_valid));
            
            // clear mailgun status (used for errors)
            rcMailgun.mailgunStatus = '';
            
            if (!scope.$$phase) scope.$apply();
            
            if (baseSuccessCallback)
              baseSuccessCallback(data);
          }
          
          var errorWrapper = function(error_message) {
            modelController.$setValidity('rcMailgunInProgress', true); 
            modelController.$setValidity('rcMailgunFinished', true);				
            modelController.$setValidity('rcMailgunEmailValid', false);
            
            // set mailgun status (used for errors)
            rcMailgun.mailgunStatus = error_message;
            if (!scope.$$phase) scope.$apply();
            
            if (baseErrorCallback)
              baseErrorCallback(error_message);
          }
          
          var inProgressWrapper = function() {
            // clear when checking
            modelController.$setValidity('rcMailgunEmailValid', true);
            modelController.$setValidity('rcMailgunInProgress', false); 
            if (!scope.$$phase) scope.$apply();
            
            if (baseInProgressCallback)
              baseInProgressCallback(error_message);
          }
          
          
          // wrap all callbacks so the validator can respond, but user can still use the callbacks if needed
          options.success = successWrapper;
          options.error = errorWrapper;
          options.in_progress = inProgressWrapper;
          
          jQuery(element).mailgun_validator(options);
          
          var clearWhenBlankValidator = function (value) {
              if (!value) {
                modelController.$setValidity('rcMailgunEmailValid', true);
                
                // clear mailgun status (used for errors)
                rcMailgun.mailgunStatus = '';
              }

              return value;
          };

          modelController.$formatters.push(clearWhenBlankValidator);
          modelController.$parsers.unshift(clearWhenBlankValidator);
          
          // if element is initialized with a value, force validation
          if (element.val()) {
            element.focusout();	
          }
        }
      }
    }]
};

var rcMailgunModule = angular.module('rcMailgun', []);

if (rcMailgunProvider) rcMailgunModule.provider(rcMailgunProvider);
if (rcMailgunValidDirective) rcMailgunModule.directive(rcMailgunValidDirective);