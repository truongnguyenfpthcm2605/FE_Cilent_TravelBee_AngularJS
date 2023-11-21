app.controller("mainController", function($scope, $http,$rootScope) {
    $scope.title = "Khám Phá Sở Thích Của Bạn Ở Nơi Chúng Tôi"
    $scope.welcome = "Welcome to Travel Bee"
    $scope.travel = "Du lịch ở bất cứ mọi nơi ở Việt Nam, hãy đi cùng chúng tôi !"
    $scope.tourOutstanding = []
    $scope.weather = function () {
        $http.get('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Ho Chi Minh City&days=1&lang=vi', {
            headers: {
                'X-RapidAPI-Key': '75c8fc4128msh9315e23595e054fp1afc18jsnd70e35f96655',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then(response => {
            $scope.today = {
                location : response.data.location.localtime,
                name :  response.data.location.name ,
                status : response.data.current.condition.text,
                C : response.data.current.temp_c
            }
        
        }).catch(error => {
            console.log(error)
        })
    }

    $scope.loadTour = function(){
        $http.get($rootScope.url + "/api/v1/home/tourOutstanding")
        .then(response => {
            $scope.tourOutstanding = response.data;
            $scope.tourOutstanding.forEach(tour => {
              if (tour.images) {
                let imageUrls = tour.images.split(',');
                imageUrls = imageUrls.map(url => url.trim());
                tour.images = imageUrls;
              }
            });

          })
          .catch(error => {
          });
    }



    $scope.loadTour()
    $scope.weather()
});