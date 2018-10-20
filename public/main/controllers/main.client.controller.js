(function () {
	"use strict";
	angular.module("main").controller("MainController", MainController);

	MainController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function MainController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm = this;
		vm.auth = angular.copy(window.user);
		vm.answers = [];

		vm.init = function () {
			mainSocket.emit('review.find', {query: {}}, function (res) {
				_.map(res, function(item) {
					var countTrue = 0;
					var totalCount = 0;

					if (item.ratings) {
						_.map(item.answer, function(nested){
							_.map(nested, function (value) {
								totalCount++

								if (value) {
									countTrue++;
								}
							});
						});
					}


					item.score = countTrue / totalCount;

					if (item.score < 0.2) {
						item.result = 'Very Poor';
					} else if (item.score > 0.2 && item.score < 0.4) {
						item.result = 'Poor';
					} else if (item.score > 0.4 && item.score < 0.6) {
						item.result = 'Good';
					} else if (item.score > 0.6 && item.score < 0.8) {
						item.result = 'Very Good';
					} else if (item.score > 0.6 && item.score < 0.8) {
						item.result = 'Very Good';
					} else {
						item.result = 'Certified';
					}

					item.score = (Math.round(item.score * 100, 2)) + '%';

					vm.answers.push(item);
				});
			});
		}

	}
})();