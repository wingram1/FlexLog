const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
    },
    createdWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    savedWorkouts: [
        {
            type:  Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ]
})

const User = model('User', UserSchema);

module.exports = User;