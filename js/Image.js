angular.module('app').controller('ImageController', function($scope, $firebaseStorage){

    $scope.uploadImage = function() {

        var storageRef = firebase.storage().ref('images/' + $scope.image.name);
      
        storageRef.put($scope.image).then(function(snapshot) {
          
          snapshot.ref.getDownloadURL().then(function(url) { 
            firebase.database().ref('images').push(url);
            $scope.imageUrl = url;
            
          });
          
        });
      
      };
  
  });