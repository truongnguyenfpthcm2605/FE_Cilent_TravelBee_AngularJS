app.controller("paymentController", function ($scope, $http, $rootScope, $location,$routeParams) {

     $scope.planourId = $routeParams.planourId
     $scope.price = $routeParams.price
     console.log($scope.price)

     $scope.orders = {}
     $scope.orders.voucher = 'N'
     let labelvoucher = document.getElementById("label-voucher")


     $scope.payment = function () {
          console.log($scope.orders)
          $location.url("m/ain")
     }

     

     $scope.checkvoucher = function () {
          console.log($scope.orders.voucher)
          $http.get($rootScope.url + '/api/v1/home/voucher/' + $scope.orders.voucher)
               .then(function (response) {
                    labelvoucher.innerHTML = response.data.title + ' Giảm giá ' + response.data.discount +"%"
                    labelvoucher.style.color = "green"
                    labelvoucher.style.fontSize = "15px"
               })
               .catch(function (error) {
                    labelvoucher.innerHTML = 'Không tìm thấy voucher'
                    labelvoucher.style.color = "red"
                    labelvoucher.style.fontSize = "15px"
               });

     }

});