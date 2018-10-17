const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CriteriaSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        default: 'input',
        enum: ['input', 'textarea', 'radio', 'checkbox', 'select']
    },
    options: [{
        type: String
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

CriteriaSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Criteria', CriteriaSchema);
