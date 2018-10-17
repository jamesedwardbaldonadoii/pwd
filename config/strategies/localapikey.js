var passport = require('passport')
    , LocalAPIKeyStrategy = require('passport-localapikey').Strategy
    , User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalAPIKeyStrategy(
        function(apikey, done) {
            User.findOne({ _id: apikey }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
};