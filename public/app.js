var App=angular.module('TestApp',[]);

App.service('TestService',function($http,$q){
    return {

        uploadFile:function(file){

            var fd = new FormData()
           
            fd.append('file',file);
            var url='https://upload.wistia.com?access_token='+'2f83d037024ff6ba1ca85a3ed5038dbb483ff05d667f194c4ad6076ba69f718e';
            console.log(url);
               
          return  $http.post(url, fd,
                    {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type':undefined}
                }).then(function(response){
                        return response.data;
                },function(error){
                    return( $q.reject( error.data ) );
                })

        }
    }

});


App.controller('TestController',function($scope,$http,TestService){
    $scope.file='';
    $scope.imageUrl='';
    $scope.hashedId='';
    $scope.loader=false;
    $scope.error=false;
    $scope.errorMessage='';
        $scope.filesChanged = function (file) {
        $scope.file=file.files[0];
        $scope.uploadFunction();
    }
    $scope.uploadFunction=function(){
        $scope.loader =true;
        $scope.error=false;
           TestService.uploadFile($scope.file)
                .then(function(response){
                    $scope.loader =false;
                   $scope.hashedId=response.hashed_id;
                },function(error){
                    $scope.loader =false;
                    $scope.error=true;
                    $scope.errorMessage=error.error;
                        
                });
            }

    });