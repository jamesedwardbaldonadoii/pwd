( function() {

	"use strict";

	angular.module("main").factory("$socketio", Getsocketio);
	angular.module("main").factory("mainSocket", mainSocket);

	Getsocketio.$inject = ["socketFactory"];
	mainSocket.$inject = ["$socketio"];

	function Getsocketio(socketFactory){
		var settings = {
		    secure: true
		};
		return function (path) {
			if(!path) path = "";
			var socket = io.connect(location.host + '/' + path, settings);
			var socket_factory = socketFactory({
			    ioSocket: socket
			});
			return socket_factory;
		}
	}

	function mainSocket($socketio){
		var MainSocket = $socketio();
		
		//  PUT EMIT LISTENERS HERE TO PASS TO SCOPE LISTENER
		
		return MainSocket;
	}

})()
