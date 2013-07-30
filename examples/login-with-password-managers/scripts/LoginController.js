var LoginController = ['$scope',
function ($scope) {
 
    $scope.session = {};
 
    $scope.login = function () {
        // process $scope.session
        alert('logged in!');
    };
}];