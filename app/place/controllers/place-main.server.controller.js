const mongoose = require('mongoose'),
 	  Place = mongoose.model('Place');

exports.create = (data, callback) => {
	let place = new Place(data);

	place.save((err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false, res);
	});
};

exports.find = {
	one: (req, callback) => {
		Place
			.findOne(req.query)
			.select(req.select)
			.exec((err, res) => {
				if(err)
					callback(err);
				else
					callback(false, res);
			});
	},
	all: (req, callback) => {
		Place
			.find({deleted_date: null})
			.sort(req.sort)
			.limit(req.limit)
			.skip(req.skip)
			.select(req.select)
			.populate('forms')
			.exec(function(err, res){
				if(err)
					callback(err);
				else
					callback(false, res);
			});
	}
};

exports.update = (req, callback) => {
	Place
		.findOneAndUpdate(req.query, req.data, { new: true })
		.select(req.select)
		// .populate(/*field model*/, /*fields*/)
		.exec((err, res) => {
			if(err)
				callback(err);
			else
				callback(false, res);
		});
};

exports.remove = (req, callback) => {
	Place
		.findOneAndUpdate(req, {
			deleted_date: new Date()
		}, { new: true })
		.select(req.select)
		// .populate(/*field model*/, /*fields*/)
		.exec((err, res) => {
			if(err)
				callback(err);
			else
				callback(false);
		});
};
