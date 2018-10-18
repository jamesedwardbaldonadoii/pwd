(function () {
	"use strict";
	angular.module("main").controller("PlaceController", PlaceController);

	PlaceController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function PlaceController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 	= this;
		vm.auth = angular.copy(window.user);
		vm.newData = {};
		vm.list = [];

		vm.formSubmit = function () {
			vm.newData.user = vm.auth._id;

			mainSocket.emit('place.create', vm.newData, function (err, res) {
				if (err) {
					return;
				}

				vm.newData = {};
				vm.list.push(res);
			});
		};

		vm.removePlace = function (item, $index) {
			mainSocket.emit('place.remove', {_id: item._id}, function (err) {
				if (err) {
					return;
				}

				vm.list.splice($index, 1);
			});
		};

		vm.init = function () {
			mainSocket.emit('place.find', {}, function (res) {
				vm.list = res;
			});
		};

		vm.init();
	}

})();
