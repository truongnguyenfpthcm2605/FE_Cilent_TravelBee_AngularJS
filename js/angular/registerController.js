app.controller("registerController", function ($scope, $location, $http, $rootScope, $cookies) {
    $scope.register = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        birthday: "",
        roles: "['USER']"
    }
    $scope.object = {

    }
    $scope.submitForm = function () {
        
        if ($scope.formregister.$valid) {
            if ($scope.register.password == $scope.register.confirmPassword) {
                alert("Passwords không giống nhau");
                return;
            }
            $http.post($rootScope.url + "/api/v1/auth/register", $scope.register)
                .then(response => {
                   console.log(response.data)
                    
                    Swal.fire({
                        title: "Đăng kis Thành Công",
                        width: 600,
                        icon: "success",
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                      rgba(0,0,123,0.4)
                      url("https://i.pinimg.com/originals/4e/bf/f3/4ebff34bb96f7d7b0c157d64bd116085.gif")
                      left top
                      no-repeat
                    `
                    });
                    

                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Đăng Kí Thất Bại",
                        text: "kiểm tra tài khoản và mật khẩu!",
                    });
                })

        } else {
            console.log("thatbai")
            alert("Login Fail")
        }
    };

});