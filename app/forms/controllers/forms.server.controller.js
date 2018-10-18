const formsmain = require('../controllers/forms-main.server.controller');

exports.create = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	formsmain.create(data, (err, res) => {
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
		formsmain.find.one(data, (err, res) => {
			if (err) {
				return callback(err);
			}
		});
	},
	all: (socket, req, callback, next) => {
		let data = req;

		/*Stuff*/
		formsmain.find.all(data, (err, res) => {
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
	formsmain.update(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false, res);
	});
};

exports.remove = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	formsmain.remove(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false);
	});
};
