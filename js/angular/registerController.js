app.controller(
  "registerController",
  function ($scope, $http, $location, $rootScope) {
    $scope.register = {
      fullname: "",
      username: "",
      email: "",
      password: "",
      birthday: "",
      roles: "USER",
    };
    $scope.confirmpass = "";
    $scope.object = {};
    $scope.submitForm = function () {
      if ($scope.formregister.$valid) {
        if ($scope.register.password !== $scope.confirmpass) {
          Swal.fire({
            icon: "error",
            title: "Đăng Kí Thất Bại",
            text: "Passwords không giống nhau",
          });
          return;
        }
        if ($scope.register.verificationCode != "") {
          if ($scope.verificationCode === $scope.code) {
            // Mã xác nhận chính xác, xử lý tiếp theo ở đây
            $http
              .post($rootScope.url + "/api/v1/auth/register", $scope.register)
              .then((response) => {
                Swal.fire({
                  title: "Đăng kí Thành Công",
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
                    `,
                });
                $location.path("/main");
              })
              .catch((error) => {
                if (error.data && error.data.status) {
                    Swal.fire({
                        icon: "error",
                        title: "Đăng Kí Thất Bại",
                        text: error.data.status,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Đăng Kí Thất Bại",
                        text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
                    });
                }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Đăng Kí Thất Bại",
              text: "Mã Xác Nhận Không Đúng",
            });
          }
        }
      } else {
        console.log("thatbai");
      }
    };
    $scope.sendEmail = function () {
      if ($scope.register.email != "") {
        var data = { email: $scope.register.email };

        $http
          .post(
            "http://localhost:8080/api/v1/auth/gmail" +
              "?email=" +
              $scope.register.email
          )
          .then(function (response) {
            Swal.fire({
              title: "Gửi Mail Thành Công",

              icon: "success",
              padding: "3em",
              color: "#716add",

              backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://i.pinimg.com/originals/4e/bf/f3/4ebff34bb96f7d7b0c157d64bd116085.gif")
                  left top
                  no-repeat
                `,
            });
            // Lưu trữ mã xác nhận từ backend
            $scope.code = response.data.data;
          })
          .catch(function (error) {
            alert("Có lỗi xảy ra khi gửi yêu cầu: " + error.statusText);
          });
      } else {
      }
    };
  }
);
