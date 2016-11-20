app.controller('BuySellController', function ($scope, $location, DataService) {
  $scope.loan = 1000;

  $scope.price = [
    200,
    400,
    750,
    1000
  ]

  $scope.go = function (path, value) {
    DataService.select_loan_amount(value);
    $location.path(path);
  };
})
