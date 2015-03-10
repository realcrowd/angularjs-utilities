/**
 * @ngdoc module
 * @name rcWizard
 *
 * @description
 * Module to encapsulate the rcWizard directive and rcStep directive.
 */

/**
 * @ngdoc directive
 * @name ng.directive:rcWizard
 *
 * @description
 * Configures the specified element as a wizard.  Uses the jQuery Bootstrap Wizard Plug-in
 *
 * @element ANY
 * @param {name} Specifies the name of the wizard which can be used to look at state 
 * information on the scope.
 */
var rcWizardDirective = {
  'rcWizard': function () {
    return {
      restrict: 'A',
      controller: ['$scope', function ($scope) {
        
        var self;
        var wizardElement;
        var wizardOptions = {};
        var steps = [];
        
        this.currentIndex = 0;
        this.firstIndex = 0;
        this.navigationLength = 0;
        
        this.addStep = function (step) {
          
          steps.push(step);
          
          if (!step.element || !step.submitController) return;
          
          // if a rcSubmitController is being used, automatically add a _hidden_ 
          // submit button so that 
          
          // in order to place an submit button that is still functional it 
          // has to technically be visible, so instead we place it way off 
          // screen
          jQuery(step.element)
            .append('<input type="submit" tabindex="-1" style="position: absolute; left: -9999px; width: 1px; height: 1px;" />')
            .attr('action', 'javascript:void(0);');
          
          // bind to the submit complete event on the rcSubmitController and 
          // if the action was successful, trigger a next on the wizard.
          step.submitController.onSubmitComplete(function (evt) {
            if (evt.success) {
              onForward(step);
            }
          });
        };
          
        this.forward = function () {
          
          if (steps.length)
          
          var currentStep = (steps.length > self.currentIndex) ? steps[self.currentIndex] : null;
          
          if (0 < steps.length && !currentStep) return;
          
          if (0 < steps.length && currentStep.submitController) {
            currentStep.submitController.submit();
          } else {
            onForward(currentStep);
          }
        };
        
        var onForward = function(currentStep) {
          
          if (0 < steps.length && 
            currentStep.formController && 
            currentStep.formController.$invalid) return;
          
          wizardElement.bootstrapWizard('next');
        };
        
        this.backward = function () {
          wizardElement.bootstrapWizard('previous');
        };
        
        var onTabChange = function (activeTab, navigation, currentIndex, nextTab) {
          
          self.currentIndex = nextTab;
          self.firstIndex = wizardElement.bootstrapWizard('firstIndex');
          self.navigationLength = wizardElement.bootstrapWizard('navigationLength');
          
          if (!$scope.$$phase) $scope.$apply();
        };
        
        var onTabClick = function (activeTab, navigation, currentIndex, clickedIndex) {
            return false;
        };
        
        var onTabShow = function (activeTab, navigation, currentIndex) {
          
          if (currentIndex > 0) {
            wizardElement
              .find('.nav li:gt(' + (currentIndex - 1) + ')')
              .removeClass("success");
            wizardElement.find('.nav li:lt(' + currentIndex + ')')
              .addClass("success");
          } else {
            wizardElement.find('.nav li').removeClass("success");
          }
          
          // if a rcStep is being used on the current tab, 
          // automatically focus on the first input of the current tab. This
          // allows for easier keyboard-ony navigation.
          if (steps.length > currentIndex && steps[currentIndex].element) {
            steps[currentIndex].element.find(':input').first().focus();
          }
        };
        
        var updateWizard = function (options) {
          
          wizardOptions = options;
          
          if (wizardElement) {
            wizardElement.bootstrapWizard(options);
            self.currentIndex = wizardElement.bootstrapWizard('currentIndex');
            self.firstIndex = wizardElement.bootstrapWizard('firstIndex');
            self.navigationLength = wizardElement.bootstrapWizard('navigationLength');
            
            if (!$scope.$$phase) $scope.$apply();
          }
        };
        
        this.setWizardElement = function (element) {
          
          wizardElement = element;
          self = this;
          updateWizard({
            'onTabChange': onTabChange,
            'onTabShow': onTabShow,
            'onTabClick': onTabClick
          });
        };
      }],
      compile: function (cElement, cAttributes, transclude) {
        return {
          pre: function (scope, formElement, attributes, wizardController) {
            // put a reference to the wizardcontroller on the scope so we can 
            // use some of the properties in the markup
            scope.rc = scope.rc || {};
            scope.rc[attributes.rcWizard] = wizardController;
          },
          post: function (scope, element, attributes, wizardController) {
            // let the controller know about the element
            wizardController.setWizardElement(element);
            if (!scope.$$phase) scope.$apply();
          }
        };
      }
    }
  }
};

/**
 * @ngdoc directive
 * @name ng.directive:rcStep
 *
 * @description
 * Configures the specified element as a wizard-step.  Tells the parent rcWizard
 * controller about the step including any optional controllers.
 *
 * @element ANY
 * @param NONE
 */
var rcWizardStepDirective = {
  'rcStep': function () {
    return {
      restrict: 'A',
      require: ['^rcWizard', '?form', '?rcSubmit'],
      link: function (scope, element, attributes, controllers) {
        
        var wizardController = controllers[0];
        
        // find all the optional controllers for the step
        var formController = controllers.length > 1 ? controllers[1] : null;
        var submitController = controllers.length > 2 ? controllers[2] : null;
        
        // add the step to the wizard controller
        var step = wizardController.addStep({ 
          'element': element, 
          'attributes': attributes, 
          'formController': formController,
          'submitController': submitController });
      }
    };
  }
};

angular.module('rcWizard', ['ng'])

.directive(rcWizardDirective)
.directive(rcWizardStepDirective);