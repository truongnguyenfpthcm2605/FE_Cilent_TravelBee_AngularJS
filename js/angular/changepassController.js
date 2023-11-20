app.controller(
  "changepassController",
  function ($scope, $http, $location, $rootScope) {
    $scope.changepass = {
      password: "thien1",
      email: $rootScope.email,
      newpass: "",
    };
    $scope.object = {};
    $scope.find = function () {
      if ($rootScope.token !== "") {
        $http
          .get($rootScope.url + "/api/v1/account/" + $rootScope.email, {
            headers: {
              Authorization: "Bearer " + $rootScope.token,
            },
          })
          .then((respone) => {
            $scope.account = respone.data;
            if ($scope.account.image === null) {
              $scope.account.image =
                "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg";
            } else {
              previewImage.src = $scope.account.image;
            }
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    };
    $scope.submitForm = function () {
      if ($scope.formchangepass.$valid) {
        if ($scope.changepass.newpass !== $scope.changepass.confirmnewpass) {
          Swal.fire({
            icon: "error",
            title: "Thay Đổi Thất Bại",
            text: "Passwords không giống nhau",
          });
          return;
        }
        console.log($scope.changepass);
        $http
          .post(
            $rootScope.url +
              "/api/v1/account/changepass" +
              "?password=" +
              $scope.changepass.password +
              "&email=" +
              $rootScope.email +
              "&newpass=" +
              $scope.changepass.newpass,
            $scope.changepass,
            {
              headers: {
                Authorization: "Bearer " + $rootScope.token,
              },
            }
          )
          .then((response) => {
            $scope.object = response.data;
            console.log(response.data);
            Swal.fire({
              title: "Đổi Mật Khẩu Thành Công",
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
            Swal.fire({
              icon: "error",
              title: "Đổi mật Khẩu Thất Bại",
              text: "Mật Khẩu Cũ Không Đúng",
            });
          });
      } else {
        console.log("thatbai");
        alert("Changepass Fail");
      }
    };
  }
);
