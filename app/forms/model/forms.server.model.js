const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let FormsSchema = new Schema({
    name: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    criterias: [{
        type: Schema.ObjectId,
        ref: 'Criteria'
    }],
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date
    },
    deleted_date: {
        type: Date
    }
});

FormsSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Forms', FormsSchema);
