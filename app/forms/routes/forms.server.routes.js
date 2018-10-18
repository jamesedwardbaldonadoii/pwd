const forms = require('../../forms/controllers/forms.server.controller');

module.exports = function(app, io) {

    io.on("connection", function (socket) {

        socket.route("forms.create", forms.create);
        socket.route("forms.find", forms.find.all);
        socket.route("forms.findOne", forms.find.one);
        socket.route("forms.remove", forms.remove);
    });
};
