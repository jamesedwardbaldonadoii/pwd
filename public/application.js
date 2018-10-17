angular.module('TPM',[
	// Angular Modules
	'ngResource', 'ngAnimate', 'ngSanitize', 'ngAria','ui.router', 'ngTagsInput','ui.bootstrap', 'btford.socket-io', 'ngMd5', 'ngNumeraljs',
	 'angular.filter', 'main',
]);

angular.module('TPM')
	// remove hasbang (#!)
	.config(['$locationProvider',
		function ($locationProvider) {
			$locationProvider.html5Mode(true);
		}
	])
	//Disables debug function used for debugger i.e Batarang and Protractor
	.config(['$compileProvider', function ($compileProvider) {
		$compileProvider.debugInfoEnabled(false);
	}]);