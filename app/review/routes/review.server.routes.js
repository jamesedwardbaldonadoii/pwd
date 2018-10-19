const review = require('../../review/controllers/review.server.controller');

module.exports = function(app, io) {

    io.on("connection", function (socket) {

        socket.route("review.create", review.create);
        socket.route("review.find", review.find.all);
        socket.route("review.findOne", review.find.one);
        socket.route("review.remove", review.remove);
    });
};
