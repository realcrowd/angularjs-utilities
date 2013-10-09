// define controller for wizard
var SampleWizardController = ['$scope', '$q', '$timeout',
function ($scope, $q, $timeout) {
  
  $scope.user = {};
  
  $scope.saveState = function() {
    var deferred = $q.defer();
    
    $timeout(function() {
      deferred.resolve();
    }, 5000);
    
    return deferred.promise;
  };
  
  $scope.completeWizard = function() {
    alert('Completed!');
  }
}];