app.controller('VerifyController', function($scope, $http, $rootScope, DataService) {
  // $scope.data = DataService.get_plan();
	$scope.locationResults;

	$scope.postKijiji = function() {
		$scope.postData = {
            "price": (($rootScope.advertisementData.price_range[0] + $rootScope.advertisementData.price_range[1])/2),
            "title": $rootScope.advertisementData.title,
            "description": $rootScope.advertisementData.description
        }

        $http.post('/postKijiji', $scope.postData)
        .success(function(response) {
            console.log(response);
        })
        .error(function(reason) {
            console.error(reason);
        });
	}

	$scope.initializeChips = function(){
		$('#description').val($rootScope.advertisementData.description);
		$('.chips-initial').material_chip({
		    data: $rootScope.authData,
		});
	}

	$scope.getLocation = function() {
	$http({
			method: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $rootScope.advertisementData.location.lat + ',' + $rootScope.advertisementData.location.lng + '&key=AIzaSyBw8Y-iZ0kK-MwfTYVVvvRhuJzA_E-050g'
		})
		.success(function(response) {
			console.log(response);
			$scope.locationResults = response.results[0].formatted_address;
		})
		.error(function(reason) {
			console.error(reason);
		});
	}
})
