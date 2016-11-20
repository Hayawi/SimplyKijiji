app.factory("ImageRequest", function($http){
    return{
        send : function(image) {
            return $http({
                method: 'POST',
                data: image,
                headers: {
                  'Content-Type': undefined
                },
                url: '/api/image/upload'
            });
        }
    }
})
