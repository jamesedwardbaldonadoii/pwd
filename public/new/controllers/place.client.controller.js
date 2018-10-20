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

		vm.viewReviews = function (placeId) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/new/modal/view-reviews.modal.client.view.html',
				size: 'lg',
      			controllerAs: '$ctrl',
				controller: ['$uibModalInstance', function($uibModalInstance) {
					var self = this;
					self.answers = [];
					self.ratings = false;
					self.questions = [];
					self.isObj = angular.isObject;

					mainSocket.emit('review.find', {query: {place: placeId}}, function (res) {
						_.map(res, function(item) {
							var countTrue = 0;
							var totalCount = 0;

							self.questions = Object.keys(item.answer);

							if (item.ratings) {
								self.ratings = true;
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

							self.answers.push(item);
						});
					});
				}]
			});

			modalInstance.result.then(angular.noop, angular.noop);
		};

		vm.init = function () {
			mainSocket.emit('place.find', {}, function (res) {
				vm.list = res;
			});
		};

		vm.init();
	}

})();
