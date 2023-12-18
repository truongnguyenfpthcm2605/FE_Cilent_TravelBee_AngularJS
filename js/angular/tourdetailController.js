// TourDetailController
app.controller('TourDetailController', function ($scope, $rootScope, $http, $routeParams, $anchorScroll, $location) {



  let tourId = JSON.parse($routeParams.tourId);

  
  
  $scope.payment = function () {
    let selectedPlantour = document.getElementsByName('selectedPlantour')[0];
    let selectedValue = selectedPlantour.value;
    
    if ($rootScope.email == '') {
      $location.url("/login");
    } else {
      $location.path("/payment/" + selectedValue + "/" + $scope.tour.price);
    }
  };
  

  $http.get($rootScope.url + '/api/v1/tour/view/' + tourId)
    .then(function (response) {
    })
    .catch(function (error) {
    });

  $http.get($rootScope.url + '/api/v1/tour/plantour/' + tourId)
    .then(function (response) {
      $scope.plantour = response.data;
    })
    .catch(function (error) {
    });


  $scope.tour = $rootScope.toursfirst.find(function (tour) {
    return tour.id === tourId;
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

    $http.get($rootScope.url + '/api/v1/comment/byTour/' + tourId)
    .then(function (response) {
      $scope.comments = response.data;
      console.log('Dữ liệu comment sau khi xử lý:', $scope.comments);
    })
    .catch(function (error) {
      console.error('Lỗi khi lấy dữ liệu comment:', error);
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
  });


  $anchorScroll();

// hàm hiện comment
  $scope.activeTab = 1;

  $scope.setActiveTab = function(tabNumber) {
    $scope.activeTab = tabNumber;
  };

  $scope.isActiveTab = function(tabNumber) {
    return $scope.activeTab === tabNumber;
  };
// hàm nhảy ảnh
$scope.currentIndex = 0;    

$scope.changeImage = function(imageSrc) {
  $scope.currentIndex = $scope.tour.images.indexOf(imageSrc);
  $scope.changeMainImage();
};
});