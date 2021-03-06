const mongoose = require('mongoose'),
 	  Forms = mongoose.model('Forms');

exports.create = (data, callback) => {
	let forms = new Forms(data);

	forms.save((err, res) => {
		if (err) {
			return callback(err);
		}

		callback(false, res);
	});
};

exports.find = {
	one: (req, callback) => {
		Forms
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
		Forms
			.find({deleted_date: null})
			.sort(req.sort)
			.limit(req.limit)
			.skip(req.skip)
			.select(req.select)
			.populate('criterias')
			.exec(function(err, res){
				if(err)
					callback(err);
				else
					callback(false, res);
			});
	}
};

exports.update = (req, callback) => {
	Forms
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
	Forms
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
