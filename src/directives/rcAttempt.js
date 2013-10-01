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
            require: ['rcAttempt', '?form'],
            controller: ['$scope', function ($scope) {
            	var formController = null;
            	
                this.attempted = false;
                
                var attemptHandlers = [];
                
                this.onAttempt = function(handler) {
                    attemptHandlers.push(handler);
                };
                
                this.setAttempted = function() {
                    this.attempted = true;
                  
                    angular.forEach(attemptHandlers, function (handler) {
                        handler();
                    });
                };
                
                this.setFormController = function(controller) {
                    formController = controller;
                };
                
                this.needsAttention = function (fieldModelController) {
                    if (!formController) return false;
                    
                    if (fieldModelController) {
                        return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                    } else {
                        return formController && formController.$invalid && (formController.$dirty || this.attempted);
                    }
                };
            }],
            compile: function(cElement, cAttributes, transclude) {
                return {
                    pre: function(scope, formElement, attributes, controllers) {
                    	
                    	var attemptController = controllers[0];
                        var formController = (controllers.length > 1) ? controllers[1] : null;
                        
                        attemptController.setFormController(formController);
                        
                        scope.rc = scope.rc || {};
                        scope.rc[attributes.name] = attemptController;
                    },
                    post: function(scope, formElement, attributes, controllers) {
                    	
                    	var attemptController = controllers[0];
                    	
                        formElement.bind('submit', function () {
                            attemptController.setAttempted();
                            if (!scope.$$phase) scope.$apply();
                        });
                }
              };
            }
        };
    }
};