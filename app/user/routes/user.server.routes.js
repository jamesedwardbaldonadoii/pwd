var user = require("../controllers/user.server.controller.js");

module.exports = function(app, io) {
	
	app.route("/api/signin")
		.post(user.signin);
	
	//USER SIGNUP
	app.route("/api/signup")
		.post(user.create);

	app.get('/signout', user.signout(io));

};
