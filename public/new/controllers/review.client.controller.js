(function () {
	"use strict";
	angular.module("main").controller("ReviewsController", ReviewsController);

	ReviewsController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function ReviewsController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 	= this;
		vm.auth = angular.copy(window.user);
		vm.places = [];

		vm.init = function () {
			mainSocket.emit('place.find', {}, function (res) {
				vm.places = res;
			});
		};

		vm.init();
	}

})();
