(function () {
	"use strict";
	angular.module("main").controller("ReviewsController", ReviewsController);

	ReviewsController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function ReviewsController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 	= this;
		vm.auth = angular.copy(window.user);
		vm.places = [];
		vm.answer = {};
		vm.done = false;

		vm.init = function () {
			mainSocket.emit('place.find', {}, function (res) {
				vm.places = res;
			});
		};

		vm.formSubmit = function (placeId, isRatings) {
			var data = {
				answer: vm.answer,
				user: vm.auth._id,
				place: placeId,
				ratings: isRatings
			};

			mainSocket.emit('review.create', data, function (err, res) {
				vm.done = true;
				vm.preview = null;
				vm.answer = {};
			});
		};

		vm.init();
	}

})();
