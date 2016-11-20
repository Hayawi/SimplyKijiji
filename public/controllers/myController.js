app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.firstName = 'This is a test'
  $scope.lastName = 'Doe'

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
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post('http://localhost:3000/api/image/upload', fd, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    })
    .success(function(response) {
      console.log(response);
    })
    .error(function(reason) {
      console.error(reason);
    });

};

	$scope.add = function(){
      var f = document.getElementById('file').files[0],
          r = new FileReader();
      r.onloadend = function(e){
        $scope.data = e.target.result;
      }
		var req = {
			method: 'POST',
			url: 'http://localhost:3000/api/image/upload',
			headers: {
				'Content-Type': "mulitpart/form-data"
			},
			data: { test: r }
		}
		$http(req).then(function(){alert("success")}, function(){alert("fail")});
	}
}]);
