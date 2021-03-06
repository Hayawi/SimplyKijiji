app.controller('SubmittedPostController', function($scope, $http, $location, $rootScope, DataService) {
  // $scope.data = DataService.get_plan();
	$scope.locationResults;

  $scope.go = function(path) {
    $location.path(path);
  }

	$scope.initializeChips = function(){
		$('#description').val($rootScope.advertisementData.description);
		$('.chips-initial').material_chip({
		    data: $rootScope.authData,
		});

    $('.close').empty();
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
