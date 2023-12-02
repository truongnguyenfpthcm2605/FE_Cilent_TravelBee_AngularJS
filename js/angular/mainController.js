app.controller("mainController", function ($scope, $http, $rootScope) {
    $scope.tourOutstanding = []
    $scope.weather = function () {
        $http.get('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Ho Chi Minh City&days=1&lang=vi', {
            headers: {
                'X-RapidAPI-Key': '75c8fc4128msh9315e23595e054fp1afc18jsnd70e35f96655',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then(response => {
            $scope.today = {
                location: response.data.location.localtime,
                name: response.data.location.name,
                status: response.data.current.condition.text,
                C: response.data.current.temp_c
            }

        }).catch(error => {

        })
    }


    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/tour/all")
            .then(response => {
                $rootScope.toursfirst = response.data;
                $rootScope.toursfirst.forEach(tour => {
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

    $scope.tours = $rootScope.toursfirst
    // Sắp xếp mảng tours theo thuộc tính view giảm dần
    $scope.tours.sort(function (a, b) {
        return b.views - a.views;
    });

    // Lấy ra 6 phần tử đầu tiên của mảng đã sắp xếp
    $scope.tourOutstanding = $scope.tours.slice(0, 6);
    $scope.weather()
});