const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    answer: {
        type: Object,
    },
    place: {
        type: Schema.ObjectId,
        ref: 'Place'
    },
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

ReviewSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Review', ReviewSchema);
