
var mongoose = require('mongoose'),
    System = mongoose.model('System'),
    Group = mongoose.model('Group'),
    UserPreference = mongoose.model('UserPreference'),
    SignUp = mongoose.model('SignUp')
    User = mongoose.model('User');

function UserServerModule(user){
    var _self = this;
    _self.user = user;
    _self.user.username = user.email.toLowerCase();
    _self.user.provider = 'local';
    _self.email = user.email.toLowerCase();
};

module.exports = UserServerModule;