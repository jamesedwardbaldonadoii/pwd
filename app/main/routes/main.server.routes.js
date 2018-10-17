var main = require('../controllers/main.server.controller');

module.exports = function(app, io) {
	// MAIN
	app.get('/', main.isUnAuthenticated, main.renderAuthenticated);
	
	app.get('/:url', main.isUnAuthenticated, main.renderAuthenticated);
	

	io.on("connection", function (socket) {

	 	socket.join("general.connect");

	});
};