// TourDetailController
app.controller('TourDetailController', function ($scope, $rootScope, $http, $routeParams) {




  var tourId = JSON.parse($routeParams.tourId);



  $http.get($rootScope.url + '/api/v1/tour/' + tourId)
    .then(function (response) {
      $scope.tour = response.data;
      console.log($scope.tour); // Kiểm tra dữ liệu tour trong console

      if ($scope.tour.images) {
        let imageUrls = $scope.tour.images.split(',');
        imageUrls = imageUrls.map(url => url.trim());
        $scope.tour.images = imageUrls;
      }
      console.log('Dữ liệu tour sau khi xử lý:', $scope.tour); // Kiểm tra dữ liệu tour trong console
    })
    .catch(function (error) {
      console.error('Error retrieving tour:', error);
    });



  $http.get($rootScope.url + '/api/v1/tour/details/' + tourId)
    .then(function (response) {
      $scope.hotel = response.data[0].hotel; // Truy cập vào thuộc tính 'hotel' trong 'response.data'
      if ($scope.hotel.images) {
        let imageUrls = $scope.hotel.images.split(',');
        imageUrls = imageUrls.map(url => url.trim());
        $scope.hotel.images = imageUrls;
      }
      console.log('Dữ liệu hotel sau khi xử lý:', $scope.hotel); // Kiểm tra dữ liệu hotel trong console   
    })
    .catch(function (error) {
      console.error('Error retrieving hotel:', error);
    });


  $http.get($rootScope.url + '/api/v1/tour/details/' + tourId)
    .then(function (response) {
      $scope.transport = response.data[0].transport; // Truy cập vào thuộc tính 'hotel' trong 'response.data'
      if ($scope.transport.images) {
        let imageUrls = $scope.transport.images.split(',');
        imageUrls = imageUrls.map(url => url.trim());
        $scope.transport.images = imageUrls;
      }
      console.log('Dữ liệu transport sau khi xử lý:', $scope.transport); // Kiểm tra dữ liệu hotel trong console   
    })
    .catch(function (error) {
      console.error('Error retrieving hotel:', error);
    });

  $http.get($rootScope.url + '/api/v1/tour/details/' + tourId)
    .then(function (response) {
      $scope.location = response.data[0].location; // Truy cập vào thuộc tính 'hotel' trong 'response.data'
      if ($scope.location.images) {
        let imageUrls = $scope.location.images.split(',');
        imageUrls = imageUrls.map(url => url.trim());
        $scope.location.images = imageUrls;
      }
      console.log('Dữ liệu location sau khi xử lý:', $scope.location); // Kiểm tra dữ liệu hotel trong console   
    })
    .catch(function (error) {
      console.error('Error retrieving hotel:', error);
    });


  $http.get($rootScope.url + '/api/v1/tour/plantour/' + tourId)
    .then(function (response) {
      $scope.plantour = response.data;
    })
    .catch(function (error) {
      console.error('Error retrieving hotel:', error);
    });




  $scope.changeImage = function (imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
  };



  $scope.changeImage = function (imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
  };


  $scope.modalVisible = false;

  $scope.openModal = function () {
    $scope.modalVisible = true;
  };

  $scope.closeModal = function () {
    $scope.modalVisible = false;
  };
  $scope.$watch('modalVisible', function (newVal) {
    console.log('modalVisible:', newVal);
  });


});