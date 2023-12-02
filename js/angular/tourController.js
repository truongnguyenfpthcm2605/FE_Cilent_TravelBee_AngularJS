
app.controller("tourController", function($scope, $http, $rootScope) {


  $scope.tourr = $rootScope.toursfirst
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

 
  $scope.selectTour = function(tour) {
    $scope.selectedTour = tour;
  };

  $scope.updatePagedTours()
 

});
  