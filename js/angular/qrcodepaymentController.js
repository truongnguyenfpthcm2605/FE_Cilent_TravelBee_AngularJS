app.controller("qrcodepaymentController", function ($scope, $http, $rootScope, $location, $routeParams) {


    $scope.orders = JSON.parse($routeParams.orders)
    $scope.id = ''
    $scope.comlete = false
    $scope.m = $scope.orders.price.toFixed(2);

    $scope.updateUseVoucher = function (voucher) {
        $http.post($rootScope.url + '/api/v1/home/voucher/update/' + voucher)
            .then(resopnse => {
                console.log(resopnse.data)
            }).catch(error => {
                console.log("bug voucher")
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


    $scope.check = 100;
    let paymentComplete = false;


    let countdownInterval = setInterval(function () {
        if (paymentComplete || $scope.comlete) {
            clearInterval(countdownInterval);
        }

        $scope.$apply(function () {
            $scope.check--;
        });

        if ($scope.check <= 0) {
            clearInterval(countdownInterval);
            Swal.fire({
                icon: "error",
                title: "Thanh toán thất bại !",
                text: "Kiểm tra lại thông tin thanh toán",
            });
            $scope.$apply(function () {
                $location.url("/tour");
            });
        }
        $http.get("https://api.phukhuong79.com/ACB.php?data=MTA5NzE0NTF8VHJ1b25nMjYwNTAxQHwxMDk3MTQ1MXwx")
        .then(response => {
            let money = response.data[0].AMOUNT;
            let contents = response.data[0].DESCRIPTION.substring(0, 10);
            if (money == $scope.m && contents == $scope.random) {
                $http.post($rootScope.url + "/api/v1/orders/save", $scope.orders,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token
                        }
                    }).then(response => {
                        if (response.data.voucher != null && response.data.voucher != undefined && response.data.voucher != '' && response.data.voucher == 'Không có') {
                            $scope.updateUseVoucher(response.data.voucher);
                        }
                        $rootScope.history.push(response.data);
                        $scope.id = response.data.id;
                        paymentComplete = true;
                        $scope.comlete = true;

                        $http.post($rootScope.url + "/api/v1/payment/save?name=" + $rootScope.fullname + "&id=" + $scope.id + "&money=" + $scope.m + "&content=" + contents)
                            .then(response => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Thanh toán thành công !",
                                    text: "Xem lịch sử vé của bạn",
                                });
                                $location.path("/inforuser/" + $scope.id);
                                clearInterval(countdownInterval);
                            }).catch(error => {
                                console.log("bug payment");
                            });

                    }).catch(error => {
                        console.log('bug');
                    });
            }
        }).catch(error => {
            console.log("bug api ");
        });

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
        Swal.fire({
            icon: "success",
            title: "Coppy Thành Công !",
            text: "Xem trong bộ nhớ tạm",
        });
    }


});