const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let PlaceSchema = new Schema({
    name: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    review: [{
        type: Schema.ObjectId,
        ref: 'Review'
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

PlaceSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Place', PlaceSchema);
