// define module for app
angular.module('LoginApp', ['rcForm', 'rcDisabled'])
.config(['rcDisabledProvider', function(rcDisabledProvider) {
  rcDisabledProvider.onDisable(function(rootElement, isDisabled) {
    var jElement = jQuery(rootElement);
      
    return jElement
            .find(':not([rc-disabled])')
            .filter(function(index) {
              return jQuery(this).parents().not(jElement).filter('[rc-disabled]').length === 0;
            })
            .filter('input:not([ng-disabled]), button:not([ng-disabled]), .btn, li')
            .add(jElement)
            .toggleClass('disabled', isDisabled)
            .filter('input, button')
            .prop('disabled', isDisabled);
  });
}]);