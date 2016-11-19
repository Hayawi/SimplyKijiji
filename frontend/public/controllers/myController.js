app.controller('myCtrl', function($scope) {
  $scope.firstName = 'This is a test'
  $scope.lastName = 'Doe'
  
  $scope.buyItem  = function() {
	  $scope.firstName = "Buy Item";
  }
  
  $scope.sellItem = function() {
	  $scope.lastName = "Sell Item";
  }
  
  
});
