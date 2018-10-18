const placemain = require('../controllers/place-main.server.controller');

exports.create = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	placemain.create(data, (err, res) => {
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
		placemain.find.one(data, (err, res) => {
			if (err) {
				return callback(err);
			}
		});
	},
	all: (socket, req, callback, next) => {
		let data = req;

		/*Stuff*/
		placemain.find.all(data, (err, res) => {
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
	placemain.update(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false, res);
	});
};

exports.remove = (socket, req, callback, next) => {
	let data = req;
	/*Stuff*/
	placemain.remove(data, (err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false);
	});
};
