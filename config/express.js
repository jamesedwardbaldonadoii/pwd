/**
*   DEPENDENCIES
**/
var config = require("./config")
    // helper modules
    , _ = require("underscore")
    , tpmsSocketio = require("./socketio")
    // express modules
    , express = require("express")
    , connect = require("connect")
    , session = require("express-session")
    , path = require("path")

    // compression type modules
    , compress = require("compression")
    , morgan = require("morgan")

    // parser modules
    , cookieParser = require("cookie-parser")
    , bodyParser = require("body-parser")
    , flash = require("connect-flash")
    , methodOverride = require("method-override")

    // listener modules
    , http = require("http")
    , https = require("https")
    , socketio = require("socket.io")

    // passport and database modules
    , passport = require("passport")
    , passportSocketIo = require("passport.socketio")
    , mongoose = require("mongoose")
    , MongoStore = require("connect-mongodb-session")(session);

/*
*   CONSTANTS
*/
var APP_HOST = process.env.OPENSHIFT_NODEJS_IP || "localhost"
    , APP_PORT = process.env.PORT || 3000;

/**
* DEFINE APP
**/
module.exports = function() {
    // initialize app
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);
    var store = new MongoStore({uri:config.db});

    /**
    *
    *       CONFIG
    *
    **/

    // setup defualts
    app.set("views", "./app");

    app.set("view engine", "ejs");

    // use middlewares
    (process.env.NODE_ENV === "development") ? app.use(morgan("dev")) : app.use(compress());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.disable('x-powered-by');

    app.use(bodyParser.json());

    app.use( cookieParser() );

    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        store: store,
        key: "express.sid",
        secret: config.sessionSecret,
        cookie: { maxAge : 1000 * 60 * 60 * 24 * 365 }
    }));

    app.use(flash());

    app.use(passport.initialize());

    app.use(passport.session());

    app.use(express.static("./public"));

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,       // the same middleware you registrer in express
        key: "express.sid",       // the name of the cookie where express/connect stores its session_id
        secret: config.sessionSecret,    // the session_secret to parse the cookie
        store: store,       // we NEED to use a sessionstore. no memorystore please
        success: tpmsSocketio.onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail: tpmsSocketio.onAuthorizeFail,     // *optional* callback on fail/error - read more below
    }));


     /*
     *  INITIALIZE SOCKETIO ROUTES
     */
     io.use(tpmsSocketio.initialize);
     io.of("/user").use(tpmsSocketio.initialize);

    /**
    *
    *       ROUTES
    *
    **/

    require("../app/main/routes/main.server.routes.js")(app, io);
    require("../app/user/routes/user.server.routes.js")(app, io);
    require("../app/criteria/routes/criteria.server.routes.js")(app, io);
    require("../app/place/routes/place.server.routes.js")(app, io);
    require("../app/forms/routes/forms.server.routes.js")(app, io);

    app.use(function(req, res){
        res.redirect("/");
    });

    server.listen(APP_PORT);

    console.log("App is starting...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Port:", APP_PORT);

    return app;
};
