app.controller('PhotoUploadController', function($rootScope, $scope, $location, DataService, $http, ImageRequest) {
  // $scope.data = DataService.get_loan_amount();
  $scope.fileModel = null;
  $rootScope.advertisementData;

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

  $scope.uploadFile = function(files) {
    $scope.formData = new FormData();
    $scope.formData.append("file", files[0]);
  }

  $scope.upload = function() {
    ImageRequest.send($scope.formData)
    .success(function(result){
	  $rootScope.advertisementData = result;
      console.log('File sent');
      console.log(result);
    })
    .error(function(error){
      console.log('error occurred sending the file');
    })
    .finally(function() {
      $scope.go('/verify', $scope.formData);
    });
  }
})
