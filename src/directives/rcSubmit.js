/**
 * @ngdoc directive
 * @name ng.directive:rcSubmit
 *
 * @description
 * Alternative to ngSubmit that verifies the ngFormController is valid before
 * executing the given expression.  Otherwise it cancels the event. 
 *
 * @element form
 * @param {expression} rcSubmit {@link guide/expression Expression} to eval.
 */
var rcSubmitDirective = {
    'rcSubmit': ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'form',
            link: function (scope, formElement, attributes, formController) {
            	
                var fn = $parse(attributes.rcSubmit);

                formElement.bind('submit', function (event) {
                    // if form is not valid cancel it.
                    if (!formController.$valid) return false;
                    
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            }
        };
    }]
};