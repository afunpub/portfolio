var onePiece=/**
* OnePiece Module
*
* Description
*/
angular.module('OnePiece', ['ngRoute'],function ($routeProvider) {
	$routeProvider.when('/',{
		templateUrl:'view.html'
	}).otherwise(
		{
			redirectTO:'/'
		}
	);
});
onePiece.controller('OnePieceCtrl', ['$scope', function($scope){
	var friend=function(name,reward) {
		this.name=name;
		this.reward=reward;
	};
	var addfriends=function () {
		return[
			new friend('蒙其·D·魯夫','5億貝里'),
			new friend('羅羅亞·索隆','3億2,000萬貝里'),
			new friend('娜美','6,600萬貝里'),
			new friend('騙人布','2億貝里'),
			new friend('文斯莫克·香吉士','1億7,700萬貝里'),
			new friend('多尼多尼·喬巴','100貝里'),
			new friend('妮可·羅賓','1億3,000萬貝里'),
			new friend('佛朗基','9,400萬貝里'),
			new friend('布魯克','8,300萬貝里'),
		];
	};
	$scope.friends=addfriends();
}])
/**
onePiece.controller('OnePieceCtrl', function($scope){
	$scope.friends=[
		{
			name:'蒙其D魯夫',
			reward:400000000,
		},
		{
			name:'布魯克',
			reward:33000000,
		},
	];
});
*/