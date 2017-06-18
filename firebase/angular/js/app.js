var app=/**
* sampleApp Module
*
* Description
*/
angular.module('sampleApp', ['firebase']);
app.factory('chatMessages', ['$firebaseArry', function($firebaseArry){
	var randomRoomId=Math.round(Math.random()*100000000);
	var ref = new Firebase('https://docs-sandbox.firebaseio.com/af/intro/demo/'+randomRoomId);
	return $firebaseArry(ref);
}]);
app.controller('ChatCtrl', ['$scope','chatMessages', function($scope,chatMessages){
	$scope.user='Guest'+Math.round(Math.random()*100);
	$scope.messages=chatMessages;
	$scope.addMessage=function () {
		$scope.messages.$add(
			{
				from:$scope.user,
				content:$scope.message
			}
		);
		$scope.message='';
	};
	$scope.messages.$loaded(function() {
		if ($scope.messages.length===0) {
			$scope.messages.$add({
				from:'My Firebase',
				content:'你好'
			});
		}
	});
}]);