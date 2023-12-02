app.controller("inforUserController", function ($scope, $http, $rootScope, $routeParams) {
     $scope.id = JSON.parse($routeParams.id)
     $scope.in4 = $rootScope.history.find(function (item) {
          return item.id == $scope.id
     })


});
