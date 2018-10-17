(function () {
	"use strict";

	angular.module("main").controller("NavigationController", NavigationController);

	NavigationController.$inject = ["Authentication"];

	function NavigationController(Authentication){

		var vm 		= this;
		this.auth 	= Authentication

	}

})();
