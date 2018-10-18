(function () {
	"use strict";
	angular.module("main").controller("FormsController", FormsController);

	FormsController.$inject = ["$scope", "$state", "$interval", "$uibModal", "mainSocket", "$sce", "$http"];

	function FormsController($scope, $state, $interval, $uibModal, mainSocket, $sce, $http) {

		var vm 	= this;
		vm.auth = angular.copy(window.user);
		vm.newData = {};
		vm.preview = {};
		vm.list = [];

		vm.removeForms = function (item, $index) {
			mainSocket.emit('forms.remove', {_id: item._id}, function (err) {
				if (err) {
					return
				}

				vm.list.splice($index, 1);
			});
		};

		vm.createReviewers = function() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/new/modal/new-forms.modal.client.view.html',
				size: 'lg',
      			controllerAs: '$ctrl',
				controller: ['$uibModalInstance', function($uibModalInstance) {
					var self = this;
					self.name = '';
					self.criterias = [];
					self.selected = [];

					mainSocket.emit('criteria.find', {}, function (res) {
						self.criterias = res;
					});

					self.ok = function () {
						if (!self.name || self.name == '') {
							return;
						}

						$uibModalInstance.close({name: self.name, criterias: _.map(self.selected, '_id')});
					};

					self.cancel = function () {
						$uibModalInstance.dismiss();
					};
				}]
			});

			modalInstance.result.then(function (data) {
				data.user = vm.auth._id;
				mainSocket.emit('forms.create', data, function (err, res) {
					if (err) {
						return;
					}

					vm.list.push(res);
				});
			}, function () {

			});
		};

		vm.init = function () {
			mainSocket.emit('forms.find', {}, function (res) {
				vm.list = res;
			});
		};

		vm.init();
	}

})();
