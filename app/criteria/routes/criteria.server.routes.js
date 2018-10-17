const criteria = require('../../criteria/controllers/criteria.server.controller');

module.exports = function(app, io) {

    io.on("connection", function (socket) {

        socket.route("criteria.create", criteria.create);
        socket.route("criteria.find", criteria.find.all);
        socket.route("criteria.findOne", criteria.find.one);
        socket.route("criteria.remove", criteria.remove);
    });
};
