app.controller("feedbackController", function($scope, $http, $rootScope) {

    $scope.feedback = {}

    $scope.send = function(){
        let item = angular.copy($scope.form)
        let url = host+'/'+'students';
        $http.post($rootScope.url + "/api/v1/tour/all",item)
        .then(respone =>{
            $scope.items.push(respone.data);
            $scope.reset()
            console.log('Create', respone)
        })
        .catch(error => {
            console.log('Error', error)
        })
    } 
 });