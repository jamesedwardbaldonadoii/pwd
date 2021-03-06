(function () {
	'use strict';
	angular.module('main').config(MainConfig);

	MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function MainConfig($stateProvider, $urlRouterProvider) {
		const home = {
			name: 'home',
			url: '/',
			templateUrl: 'main/views/main.client.view.html'
		};


		const new_criteria = {
			name: 'new_criteria',
			url: '/new/criteria',
			templateUrl: 'new/views/new-criteria.client.view.html',
			controller: 'CriteriaController',
			controllerAs: 'vm'
		};

		const new_place = {
			name: 'new_place',
			url: '/new/place',
			templateUrl: 'new/views/new-place.client.view.html',
			controller: 'PlaceController',
			controllerAs: 'vm'
		};

		const new_forms = {
			name: 'new_forms',
			url: '/new/forms',
			templateUrl: 'new/views/new-forms.client.view.html',
			controller: 'FormsController',
			controllerAs: 'vm'
		};

		const new_review = {
			name: 'new_review',
			url: '/new/review',
			templateUrl: 'new/views/new-review.client.view.html',
			controller: 'ReviewsController',
			controllerAs: 'vm'
		};

		$stateProvider.state(home);
		$stateProvider.state(new_criteria);
		$stateProvider.state(new_forms);
		$stateProvider.state(new_review);
		$stateProvider.state(new_place);
	}
})();
