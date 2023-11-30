app.controller("paymentController", function($scope, $http, $rootScope,$location) {

   $scope.orders ={}

   $scope.payment = function(){
        console.log($scope.orders)
   }

 });