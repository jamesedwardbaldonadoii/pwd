(function () {
	"use strict";
	angular.module("main").controller("MainController", MainController);

	MainController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function MainController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 		 	= this;
		vm.auth 	 	= angular.copy(window.user);
	}
})();