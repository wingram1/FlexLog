const { Schema, model } = require('mongoose');

const WorkoutSchema = new Schema({
    createdBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    exercises: [
        {
            type: String
        }
    ],
    categories: [
        {
            type: String
        }
    ]
})

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;