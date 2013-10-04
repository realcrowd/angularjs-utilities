/**
 * @ngdoc module
 * @name rcDisabled
 *
 * @description
 * Module to encapsulate the rcDisabled directive and rcDisabledProvider.
 */

/**
 * @ngdoc directive
 * @name ng.directive:rcDisabled
 *
 * @description
 * calls rcDisabledProvider.disable on the given element.
 *
 * @element ANY
 * @param {expression} rcDisabled {@link guide/expression Expression} to watch 
 * which determines when to disable.
 */
var rcDisabledDirective = {
  'rcDisabled': ['rcDisabled', function (rcDisabled) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        
        scope.$watch(attributes.rcDisabled, function(isDisabled) {
          rcDisabled.disable(element, isDisabled);
        });
      }
    }
  }]
};

/**
 * @ngdoc provider
 * @name ng.provider:rcDisabledProvider
 *
 * @description
 * The provider for rcDisabled. Allows configuration of the method used when
 * toggling disabled.
 *
 */
var rcDisabledProvider = function () {
    
  var defaultDisableItemsHandler = function(rootElement, isDisabled) {
    var jElement = jQuery(rootElement);
    
    return jElement
            .find(':not([rc-disabled])')
            .filter(function(index) {
              return jQuery(this)
                       .parents()
                       .not(jElement)
                       .filter('[rc-disabled]').length === 0;
            })
            .filter('input:not([ng-disabled]), button:not([ng-disabled])')
            .prop('disabled', isDisabled);
  };
  
  var customDisableItemsHandler;
  
  this.onDisableItems = function (customHandler) {
    customDisableItemsHandler = customHandler;
  };
  
  this.$get = function () {
    return {
      disable: function (rootElement, isDisabled) {
        return (customDisableItemsHandler) ? 
               customDisableItemsHandler(rootElement, isDisabled) : 
               defaultDisableItemsHandler(rootElement, isDisabled);
      }
    }
  };
};

angular.module('rcDisabled', [])
.provider('rcDisabled', rcDisabledProvider)
.directive(rcDisabledDirective);