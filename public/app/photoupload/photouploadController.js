app.controller('PhotoUploadController', function($scope, $location, DataService, $http) {
  // $scope.data = DataService.get_loan_amount();
  $scope.fileModel = null;

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

  $scope.imageUploaded = function() {
    return $scope.fileModel ? true : false;
  }

  $scope.upload = function() {
    //$scope.fileModel
  }
})
