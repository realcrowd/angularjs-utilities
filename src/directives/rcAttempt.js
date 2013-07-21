/**
 * @ngdoc directive
 * @name ng.directive:rcAttempt
 *
 * @description
 * Used to track submit attempts on forms. It mimics the ngFormController by
 * adding to the scope so the attempt flag can be referenced in markup.
 *
 * @element form
 */
var rcAttemptDirective = {
    'rcAttempt': function () {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                this.attempted = false;
                
                var attemptHandlers = [];
                
                this.onAttempt = function(handler) {
                	attemptHandlers(handler);
                };
                
                this.setAttempted = function() {
                	this.attempted = true;
                	
                	angular.forEach(attemptHandlers, function (handler) {
                        handler();
                    });
                };
            }],
            compile: function(cElement, cAttributes, transclude) {
              return {
                pre: function(scope, formElement, attributes, attemptController) {
                  scope.rc = scope.rc || {};
                  scope.rc[attributes.name] = attemptController;
                },
                post: function(scope, formElement, attributes, attemptController) {
                  formElement.on('submit', function () {
                      attemptController.setAttempted();
                      if (!scope.$$phase) scope.$digest();
                  });
                }
              };
            }
        };
    }
};