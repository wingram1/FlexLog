const { Schema } = require('mongoose');

const settingsSchema  = new Schema({
    sets: {
        type: Number,
        required: false
    },
    reps: {
        type: Boolean,
        required: false,
    },
    distance: {
        type: Boolean,
        required: false
    },
    timer: {
        type: String,
        required: false
    },
    rest: {
        type: Number,
        required: true
    },
    
},
);

module.exports = settingsSchema;