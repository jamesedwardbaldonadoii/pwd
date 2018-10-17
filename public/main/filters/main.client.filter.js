angular.module("main")
	.filter("user", function() {
		return function(name){
			return name.firstName + ' ' + name.lastName;
		};
	});