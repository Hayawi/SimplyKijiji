app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.formData;

	$scope.buyItem  = function() {
		$scope.firstName = "Buy Item";
	}
	
	$scope.sellItem = function() {
		$scope.lastName = "Sell Item";
	}
	
	$scope.formSubmit = function() {
		var req = {
			method: 'POST',
			url: 'http://localhost:3000/api/image/upload',
			headers: {
				'Content-Type': undefined
			},
			data: { test: 'test' }
		}
	}
	
	$scope.uploadFile = function(files) {
		$scope.formData = new FormData();
		//Take the first selected file
		$scope.formData.append("file", files[0]);
	};

	$scope.submitImage = function(){
		$http.post('http://localhost:3000/api/image/upload', $scope.formData, {
			headers: {'Content-Type': undefined},
			transformRequest: angular.identity
		})
		.success(function(response) {
			console.log(response);
		})
		.error(function(reason) {
			console.error(reason);
		});
	}
	
	
}]);
