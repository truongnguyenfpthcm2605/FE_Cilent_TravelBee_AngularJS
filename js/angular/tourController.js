
app.controller("tourController", function($scope, $http, $rootScope) {

  $scope.tourr = [];
  $scope.currentPage = 0;
  $scope.pageSize = 6;
  $scope.selectedTour = null;

  

  $scope.updatePagedTours = function() {
    var start = $scope.currentPage * $scope.pageSize;
    var end = start + $scope.pageSize;
    $scope.tours = $scope.tourr.slice(start, end);
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
      $scope.updatePagedTours();
    }
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.updatePagedTours();
    }
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.tourr.length / $scope.pageSize);
  };

  $scope.findAll = function() {
    $http.get($rootScope.url + "/api/v1/tour/all")
      .then(response => {
        $scope.tourr = response.data;
        $scope.tourr.forEach(tour => {
          if (tour.images) {
            let imageUrls = tour.images.split(',');
            imageUrls = imageUrls.map(url => url.trim());
            tour.images = imageUrls;
          }
        });

        $scope.updatePagedTours(); // Gọi updatePagedTours() sau khi gán dữ liệu
        console.log('Success', response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };
 
  $scope.findAll();
  $scope.selectTour = function(tour) {
    $scope.selectedTour = tour;
  };
 

});
  