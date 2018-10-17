const config = require('./config'),
      mongoose = require('mongoose');

module.exports = function() {
    mongoose.Promise = global.Promise;
    const db = mongoose.connect(config.db);

    /*Models*/
    require('../app/user/model/user.server.model.js');
    require('../app/criteria/model/criteria.server.model.js');

    return db;
};
