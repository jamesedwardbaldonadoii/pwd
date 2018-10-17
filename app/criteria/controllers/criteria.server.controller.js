const criterimain = require('../controllers/criteria-main.server.controller');

exports.create = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	criterimain.create(data, (err, res) => {
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
		criterimain.find.one(data, (err, res) => {
			if (err) {
				return callback(err);
			}
		});
	},
	all: (socket, req, callback, next) => {
		let data = req;

		/*Stuff*/
		criterimain.find.all(data, (err, res) => {
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
	criterimain.update(data, (err, res) => {
		if (err) {
			return callback(err);
		}
	});
};

exports.remove = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	criterimain.remove(data, (err, res) => {
		if (err) {
			return callback(err);
		}
	});
};
