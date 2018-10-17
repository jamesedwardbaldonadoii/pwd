(function () {
	"use strict";
	angular.module("main").controller("CriteriaController", CriteriaController);

	CriteriaController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function CriteriaController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 	= this;
		vm.auth = angular.copy(window.user);
		vm.newData = {};
		vm.list = [];

		vm.formSubmit = function () {
			var data = angular.copy(vm.newData);
			data.user = vm.auth._id;

			if (data.options && data.options.length) {
				data.options = _.map(data.options, 'text');
			}

			mainSocket.emit('criteria.create', data, function (err, res) {
				vm.newData = {};
			});
		};

		vm.formTypeChange = function () {
				vm.newData.options = [];
			if (vm.newData.type !== 'input' && vm.newData.type !== 'textarea'){
				vm.newData.options.push({text: ''});
			}
		};

		vm.newOptions = function () {
			var lastOpt = vm.newData.options[vm.newData.options.length - 1];

			if (lastOpt && lastOpt.text !== '') {
				vm.newData.options.push({text: ''});
			}
		};

		vm.init = function () {
			mainSocket.emit('criteria.find', {}, function (res) {
				vm.list = res;
			});
		};

		vm.init();
	}

})();
