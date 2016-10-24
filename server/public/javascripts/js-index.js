$(document).ready(function(e){
    		$(".img-check").click(function(){
				$(this).toggleClass("check");
			});
	});

  angular.
    module('recepie', []).
    controller('search-recepie',function($scope, $http){
      console.log($scope);
      $http({
  method: 'POST',
  url: '/get_recipe',
  data: {
    food: req.body.name
  }
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('Recepies', response)
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('Mauro is stupid');
  });
    })
