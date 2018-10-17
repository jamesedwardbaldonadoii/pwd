const 
	User = require('mongoose').model('User'),
	multer = require("multer"),
	passport = require("passport");

exports.renderSignin = function(req, res, next){
	if(!req.user){
		res.render("user/views/index", {
			title: "Welcome"
		});
	} else next();
};

exports.renderSignup = function(req, res, next){
	if(!req.user){
		res.render("user/views/signup", {
			title: "Welcome"
		});
	} else next();
};

exports.signout = function(io) {

	return function(req, res) {

		req.logout();

		io.emit("disconnect");

		res.redirect('/');
	}
};

exports.signin = function (req, res, next) {
	/*
	*   PREVENT DOUBLE LOGGED IN
	*/
	if(req.isAuthenticated()){
		res.json({
			login:true, message:"User already logged in." 
		});
		return;
	}

	var callback = function (err, user, info) {
		if(err) return;
		if(!user) return  res.json(info);
		else {
			req.logIn(user, function (err) {
				if(err) return;
				else {
					res.redirect("/");
				}
			});
		}
	};
	
	passport.authenticate("local", callback)(req, res, next);
};

exports.create = function(req, res, next) {
	let data = req.body;
	data.provider = 'local';

    const user = new User(data);

    user.save(function (err, response) {
        if (err) {
            res.json(err);
        }
        console.log(err);
        console.log(response);

        if(response){ 
            next();
        }
    });
}
