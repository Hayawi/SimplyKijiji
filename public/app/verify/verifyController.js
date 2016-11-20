app.controller('VerifyController', function($scope, DataService) {
  $scope.data = DataService.get_plan();

  $scope.test = function(){
    console.log('clicked');
    $("#pin_button").animate({ backgroundColor: "red" }, "slow");
  }
})
