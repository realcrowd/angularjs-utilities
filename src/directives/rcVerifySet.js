/**
 * @ngdoc directive
 * @name ng.directive:rcVerifySet
 *
 * @description
 * Used to verify the scope is updated from the view. This need arose out
 * of some browser plugins (namely Password Managers), manipulate the DOM
 * and do not necessarily fire the events that angular list to by default.
 * Using this method the values are pushed to the scope before submission. 
 * before submit.
 *
 * @element ANY
 */
var rcVerifySetDirective = {    'rcVerifySet': function () {        return {            restrict: 'A',            require: ['^rcSubmit', 'ngModel'],            link: function (scope, element, attributes, controllers) {                var submitController = controllers[0];                var modelController = controllers[1];
                
                submitController.onAttempt(function() {
                    modelController.$setViewValue(element.val());
                });            }        };    }};