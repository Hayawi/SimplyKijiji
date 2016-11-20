app.controller('FooterController', function ($scope, $location) {
  $scope.isSelected = function () {
    switch ($location.$$path) {
      case '/photoupload':
        $("#page2").prop('checked', true);
        break;
      case '/verify':
        $("#page3").prop('checked', true);
        break;
      default:
        $("#page1").prop('checked', true);
        break;
    }
    return true;
  }

  $scope.go = function (path) {
    $location.path(path);
  };

})
