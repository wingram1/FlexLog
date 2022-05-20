const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    createdWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    savedWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;