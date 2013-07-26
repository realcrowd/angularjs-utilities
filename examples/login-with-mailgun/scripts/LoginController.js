var LoginController = ['$scope', 'rcMailgun',
function ($scope, rcMailgun) {
 
    $scope.session = {};
    $scope.rcMailgun = rcMailgun;
 
    $scope.login = function () {
        // process $scope.session
        alert('logged in!');
    };
}];