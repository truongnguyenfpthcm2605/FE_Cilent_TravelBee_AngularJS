app.controller("tourController", function($scope, $http, $rootScope) {

    $scope.tours = [];
  
    $scope.findAll = function() {
      $http.get($rootScope.url + "/api/v1/tour/all")
        .then(response => {
          $scope.tours = response.data;
          $scope.tours.forEach(tour => {
            if (tour.images) {
              let imageUrls = tour.images.split(',');
              imageUrls = imageUrls.map(url => url.trim());
              tour.images = imageUrls;
            }
          });
        })
        .catch(error => {
        });
    };
  
    $scope.findAll();
  });
  