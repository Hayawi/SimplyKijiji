app.controller('PhotoUploadController', function($scope, $location, DataService, $http, ImageRequest) {
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
    ImageRequest.send($scope.fileModel)
    .success(function(result){
      console.log('File sent');
      console.log(result);
    })
    .error(function(error){
      console.log('error occurred sending the file');
    })
    .finally(function() {
      $scope.go('/verify', $scope.selected_option);
    });
  }
})
