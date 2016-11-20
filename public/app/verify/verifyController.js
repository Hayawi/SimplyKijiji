app.controller('VerifyController', function($scope, $rootScope, DataService) {
  // $scope.data = DataService.get_plan();

	$scope.initializeChips = function(){
		$('.chips-initial').material_chip({
		    data: $rootScope.authData,
		});
	}
})
