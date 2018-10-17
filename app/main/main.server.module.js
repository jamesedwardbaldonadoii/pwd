var shared_server = require('../shared/main');

var SharedServer = new shared_server();

function IndexServerModule(req, res){
    var _self = this;
    _self.auth = req.user;
    _self.req = req;
    _self.res = res;
    if(_self.auth){
        if(_self.auth.deactivate){
            _self.view = 'deactivated';
        }
        else {
            _self.view = 'authenticated';
        }
    }
    else {
        _self.view = 'unauthenticated';
    }
};

IndexServerModule.prototype.render = function(main){
    return SharedServer.views[this.view](this.req, main)
};

module.exports = IndexServerModule;