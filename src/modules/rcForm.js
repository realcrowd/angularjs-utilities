/**
 * @ngdoc module
 * @name rcForm
 *
 * @description
 * Module to encapsulate all of our custom form-based directives.
 */
var rcFormModule = angular.module('rcForm', []);var rcSubmitDirective = rcSubmitDirective || null;
var rcVerifySetDirective = rcVerifySetDirective || null;
if (rcSubmitDirective) rcFormModule.directive(rcSubmitDirective);if (rcVerifySetDirective) rcFormModule.directive(rcVerifySetDirective);