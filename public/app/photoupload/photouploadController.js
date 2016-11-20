app.controller('PhotoUploadController', function($scope, $location, DataService, $http) {
  // $scope.data = DataService.get_loan_amount();

  $scope.go = function (path, value) {
    $location.path(path);
  };

  $scope.image_is_selected = function() {
    return $scope.selected_option != null;
  }

  $scope.select_repayment = function(value) {
    $scope.selected_option = value;
    DataService.select_plan(value);
  }


  $scope.upload = function() {
    console.log($scope.fileModel);
  }
})
