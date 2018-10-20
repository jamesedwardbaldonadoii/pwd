(function () {
	"use strict";

	angular.module("main").controller("NavigationSideController", NavigationSideController);

	NavigationSideController.$inject = ["Authentication"];

	function NavigationSideController(Authentication){

		var vm = this;
		vm.navigations = [
			{
				display: 'Dashboard',
				path: 'home',
				icon: 'fa fa-home'
			},
			{
				display: 'New Criteria',
				path: 'new_criteria',
				icon: 'fa fa-plus'
			},
			{
				display: 'New Place',
				path: 'new_place',
				icon: 'fa fa-plus'
			},
			{
				display: 'New Forms',
				path: 'new_forms',
				icon: 'fa fa-plus'
			},
			{
				display: 'New Review',
				path: 'new_review',
				icon: 'fa fa-plus'
			}
		];
	}

})();
