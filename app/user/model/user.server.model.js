var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: {
        type: String,
        required: 'firstname is required'
    },

    lastname: {
        type: String,
        required: 'lastname is required'
    },

    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    
    username: {
        type: String,
        trim: true
    },

    cnumber: {
        type: String,
        trim: true
    },

    caddress: {
        type: String,
        trim: true
    },

    requirements: {
        docs: String,
        url: String,
        verified: {
            type: Boolean,
            default: false
        }
    },

    type: {
        type: String,
        enum: ['investor', 'investee', 'admin']
    },

    status: {
        type: String,
        default: 'unverified',
        enum: ['active', 'ban', 'disabled', 'unverified']
    },

    royalty: {
        type: String,
        default: 'starter',
        enum:  ['starter', 'premium', 'diamond']
    },

    slogan: {
        type: String
    },

    organization: {
        type: Schema.ObjectId,
        ref: 'Organization'
    },

    // Authentications Security
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },

    salt: {
        type: String
    },

    provider: {
        type: String,
        required: 'Provider is required'
    },

    providerId: String,

    providerData: {},

    sessions: [{
        createdDate: {
            type: Date
        },
        guid: {
            type: String
        },
        sessionType: {
            type: String
        }
    }],

    created_date: {
        type: Date,
        default: Date.now
    },

    updated_date: {
        type: String
    },

    deleted_date: {
        type: String
    }
});

UserSchema.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstname = splitName[0] || '';
    this.lastname = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    };
    next();
});

UserSchema.methods.hashPassword = function(password) {
    if (!password || !this.salt) return '';
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'binary'), 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);