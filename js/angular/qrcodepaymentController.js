app.controller("qrcodepaymentController", function ($scope, $http, $rootScope, $location, $routeParams) {


    $scope.orders = JSON.parse($routeParams.orders)
    $scope.pay = false
    $scope.id = ''

    $scope.updateUseVoucher = function(voucher){
        $http.post($rootScope.url + '/api/v1/home/voucher/update/'+voucher)
        .then(resopnse => {
            console.log(resopnse.data)
        }).catch(error => {
            console.log(error)
        })
    }

    $scope.random = ""
    let content = document.getElementById('bankcontent')
    function generateRandomText(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }


    $scope.random = generateRandomText(10);
    content.innerHTML = $scope.random


    $http.get("https://api.phukhuong79.com/ACB.php?data=MDM2MzU2MTYyOXxLaHVvbmcwNzA5MjAwNUB8MTI5NDAyMzF8MQ==")
        .then(response => {
            let money = response.data[0].AMOUNT;
            let contents = response.data[0].TYPE;
            if (money == 29000 && contents == "OUT") {
                $http.post($rootScope.url + "/api/v1/orders/save", $scope.orders,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).then(resopnse => {
                        if(resopnse.data.voucher!=null){
                            $scope.updateUseVoucher(resopnse.data.voucher)
                        }
                        $rootScope.history.push(resopnse.data)
                        $scope.id = resopnse.data.id
                        $http.post($rootScope.url + "/api/v1/payment/save?name=" + $rootScope.fullname + "&id=" + $scope.id + "&money=" + money + "&content=" + contents)
                            .then(resopnse => {                            
                                $scope.pay = true
                                $location.path("/inforuser/" + $scope.id);
                            }).catch(error => {

                            })
                    }).catch(error => { })
            }
        }).catch(error => {

        })


    $scope.check = 180
    let countdownInterval = setInterval(function () {
        $scope.$apply(function () {
            $scope.check--;
        });

        if ($scope.pay) {
            Swal.fire({
                icon: "success",
                title: "Thanh toán thành công !",
                text: "Xem lịch sử vé của bạn",
            });
            clearInterval(countdownInterval);
            
        }

        if ($scope.check <= 0) {
            clearInterval(countdownInterval);
            Swal.fire({
                icon: "error",
                title: "Thanh toán thất bại !",
                text: "kiểm tra lại thông tin thanh toán",
            });
            $scope.$apply(function () {
                $location.url("/tour");
            });
        }
    }, 1000);


    $scope.copyToClipboard = function () {
        // Tạo một thẻ textarea ẩn để chứa nội dung cần sao chép
        var textarea = document.createElement('textarea');

        // Lấy nội dung từ thẻ span
        var bankContent = document.getElementById('bankcontent').innerText;

        // Thiết lập nội dung cho textarea
        textarea.value = bankContent;

        // Thêm textarea vào body
        document.body.appendChild(textarea);

        // Chọn toàn bộ nội dung trong textarea
        textarea.select();

        // Sao chép nội dung vào clipboard
        document.execCommand('copy');

        // Xóa textarea khỏi body
        document.body.removeChild(textarea);

        // Thông báo hoặc xử lý sau khi sao chép thành công
        alert('Đã sao chép vào clipboard: ' + bankContent);
    }


});