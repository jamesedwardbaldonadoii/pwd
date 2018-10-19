const reviewmain = require('../controllers/review-main.server.controller');

exports.create = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	reviewmain.create(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(null, res);
	});
};

exports.find = {
	one: (socket, req, callback, next) => {
		let data = req;
		/*Stuff*/
		reviewmain.find.one(data, (err, res) => {
			if (err) {
				return callback(err);
			}
		});
	},
	all: (socket, req, callback, next) => {
		let data = req;

		/*Stuff*/
		reviewmain.find.all(data, (err, res) => {
			if (err) {
				return callback(err);
			}

			callback(res);
		});
	}
};

exports.update = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	reviewmain.update(data, (err, res) => {
		if (err) {
			return callback(err);
		}
		
		callback(false, res);
	});
};

exports.remove = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	reviewmain.remove(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false);
	});
};
