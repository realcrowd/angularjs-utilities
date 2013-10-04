var LoginController = ['$scope', '$q', '$timeout',
function ($scope, $q, $timeout) {
 
    $scope.session = {};
 
    $scope.login = function () {
        // process $scope.session
        
        var deferred = $q.defer();
        
        // fake a long running task
        $timeout(function() {
          
          deferred.resolve();
          alert('logged in!');
        }, 5000);
        
        return deferred.promise;
    };
}];