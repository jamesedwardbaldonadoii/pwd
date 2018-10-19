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

		vm.setPlaceForms = function (place) {
			var data = {
				query: {
					_id: place._id
				},
				data: {}
			};

			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/new/modal/set-forms.modal.client.view.html',
				size: 'md',
      			controllerAs: '$ctrl',
				controller: ['$uibModalInstance', function($uibModalInstance) {
					var self = this;
					self.forms = [];

					mainSocket.emit('forms.find', {}, function (res) {
						self.forms = res;
					});

					self.ok = function (form) {
						if (!form) {
							return;
						}

						$uibModalInstance.close(form);
					};
				}]
			});

			modalInstance.result.then(function (form) {
				data.data = {
					forms: form._id
				};

				mainSocket.emit('place.update', data, function (err) {
					if (err) {
						return;
					}

					place.forms = form;
				});
			}, function () {

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
