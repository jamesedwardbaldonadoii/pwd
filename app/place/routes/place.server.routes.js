const place = require('../../place/controllers/place.server.controller');

module.exports = function(app, io) {

    io.on("connection", function (socket) {

        socket.route("place.create", place.create);
        socket.route("place.find", place.find.all);
        socket.route("place.findOne", place.find.one);
        socket.route("place.remove", place.remove);
    });
};
