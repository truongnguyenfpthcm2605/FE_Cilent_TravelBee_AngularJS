app.controller("qrcodepaymentController", function ($scope, $http, $rootScope, $location, $routeParams, $timeout) {


    $scope.orders = JSON.parse($routeParams.orders)
    $scope.id = ''
    $scope.m = $scope.orders.price.toFixed(2);
    $scope.check = 120;


    $scope.updateUseVoucher = function (voucher) {
        $http.post($rootScope.url + '/api/v1/home/voucher/update/' + voucher)
            .then(resopnse => {
                paymentComplete = true
            }).catch(error => {
                paymentComplete = true
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




    let countdownInterval;
    let paymentComplete = false;
    let pay = true;
    let paymentInProgress = false;

    function countdown() {
        $scope.check--;

        if (!paymentComplete && !paymentInProgress) {
            paymentInProgress = true;

            $http.get("https://api.phukhuong79.com/ACB.php?data=MTA5NzE0NTF8VHJ1b25nMjYwNTAxQHwxMDk3MTQ1MXwx")
                .then(response => {
                    let money = response.data[0].AMOUNT;
                    let contents = response.data[0].DESCRIPTION.substring(0, 10);
                    let type = response.data[0].TYPE;
                    if (money == $scope.m && type == "IN" && contents == $scope.random) {
                        if (pay) {
                            $http.post($rootScope.url + "/api/v1/orders/save", $scope.orders, {
                                headers: {
                                    'Authorization': 'Bearer ' + $rootScope.token
                                }
                            }).then(response => {
                                if (response.data.voucher != null && response.data.voucher != undefined && response.data.voucher != '' && response.data.voucher == 'Không có') {
                                    $scope.updateUseVoucher(response.data.voucher);
                                }

                                $rootScope.history.push(response.data);
                                $scope.id = response.data.id;
                                $http.post($rootScope.url + "/api/v1/payment/save?name=" + $rootScope.fullname + "&id=" + $scope.id + "&money=" + $scope.m + "&content=" + contents)
                                    .then(response => {
                                        paymentComplete =true
                                        Swal.fire({
                                            icon: "success",
                                            title: "Thanh toán thành công !",
                                            text: "Kiểm tra lại thông tin vé",
                                        });
                                        $location.path("/inforuser/" + $scope.id);
                                    }).catch(error => {
                                    });

                            }).catch(error => {
                                handlePaymentFailure();
                            }).finally(() => {
                                paymentInProgress = false;
                            });

                            pay = false;
                        }
                    }
                })
                .catch(error => {
                    handlePaymentFailure();
                })
                .finally(() => {
                    paymentInProgress = false;
                });
        }

        if ($scope.check <= 0 && !paymentComplete) {
            handlePaymentFailure();
        }

        if (!$scope.$$phase) {
            $scope.$apply();
        }

        if (!paymentComplete) {
            countdownInterval = $timeout(countdown, 1000);
        }
    }

    function handlePaymentFailure() {
        if (countdownInterval) {
            $timeout.cancel(countdownInterval);
        }
        Swal.fire({
            icon: "error",
            title: "Thanh toán thất bại !",
            text: "Kiểm tra lại thông tin thanh toán",
        });
        $scope.$apply(function () {
            $location.url("/tour");
        });
    }

    countdown();









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