app.factory("Twilio", function($http){
    return{
        send : function() {
            return $http({
                method: 'GET',
                url: '/api/twilio'
            });
        }
    }
})
