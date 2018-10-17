var route = function  () {
	/*
	* 	CHECK IF THERE ARE NO ARGUMENTS PASSED 
	*	AND IF THE FIRST ARGUMENT IS NOT A STRING(ROUTE)
	*	AND LOOP THROUGH THE NEXT ARGUMENTS IF IT IS A FUNCTION
	*/
	if(!arguments.length) return "no arguments passed";
	if(typeof arguments[0] !== "string") return "Invalid first argument (not a string)";
	for(var i=1; i < arguments.length; i++){
		if(typeof arguments[i] !== "function") return  "Invalid argument "+i+" (not a function)";
	}

	/*
	* 	DECLARE PARENT AS SOCKET AND FIRST ARGUMENT AS ROUTE 
	*/
	var socket = this;
	var route = arguments[0];
	var args = arguments;
	return socket.on(route, function (data, callback) {
		var counter = 1;
		function next (passed) {
			counter++;
			if(args[counter]) args[counter](socket, data, callback, next, passed);
		}
		args[counter](socket, data, callback, next);
	});
}

exports.initialize = function(socket, next){
	if(!socket.route) socket.route = route;
	next();
}

exports.onAuthorizeSuccess = function(data, accept){
    console.log('successful connection to socket.io');
    // The accept-callback still allows us to decide whether to 
    // accept the connection or not. 
    accept(null, true);
}

exports.onAuthorizeFail = function(data, message, error, accept){
	console.log("ERROR: ", error)
    if(error) console.trace(error);
    console.log('failed connection to socket.io:', message);
    // We use this callback to log all of our failed connections. 
    accept(null, false);
}