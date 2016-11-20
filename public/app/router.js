app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/buysell/buysell.html',
    controller: 'BuySellController'
    })
    .when('/form', {
      templateUrl: '/app/form/form.html',
      controller: 'FormController'
    })
    .when('/verify', {
      templateUrl: '/app/verify/verify.html',
      controller: 'VerifyController'
    })
    .otherwise({
      templateUrl: '/app/buysell/buysell.html'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
}])
