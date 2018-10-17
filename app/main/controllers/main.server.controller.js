var   _ 			= require('underscore')
	, moment 		= require('moment')
	, mongoose 		= require('mongoose');


exports.isUnAuthenticated = function(req, res, next){
	if(!req.user){
		if (req.params.url && req.params.url == 'signup') {
			res.render('user/views/signup', {
				title: 'App: Login'
			});

		} else {
			res.render('user/views/index', {
				title: 'App: Login'
			});
		}
	} else next();
};

exports.renderAuthenticated = function(req, res, next){

	if(req.params.url && req.params.url == 'signout'){
		req.logout();
        req.session.redirectTo = '/';
		res.redirect('/');
	} else {		
		var view_environment = 'main/views/main.' + process.env.NODE_ENV + '.server.view.ejs';

		res.render(view_environment, {
			title: 'Inbizz',
			authentication: req.user,
			env: process.env.NODE_ENV
		});
	}
};