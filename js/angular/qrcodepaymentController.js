app.controller("qrcodepaymentController", function($scope, $http, $rootScope,$location) {

    $scope.check = 10
    let countdownInterval = setInterval(function() {
        $scope.$apply(function() {
            $scope.check--; 
        });

        if ($scope.check <= 0) {
            clearInterval(countdownInterval); 
            Swal.fire({
                icon: "error",
                title: "Thanh toán thất bại !",
                text: "kiểm tra lại thông tin thanh toán",
            });
            $scope.$apply(function() {
                $location.url("/tour");
            });
        }
    }, 1000);

 });