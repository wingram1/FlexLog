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
            title: {
                type: String
            },
            description: {
                type: String,
                         
            },
            id: {
                type: Number
            },
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String
            },
            settings: [
                {
                    sets: {
                        type: Number,
                        required: false
                    },
                    reps: {
                        type: Number,
                        required: false,
                    },
                    distance: {
                        type: Number,
                        required: false
                    },
                    timer: {
                        type: String,
                        required: false
                    },
                    rest: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }

    ],
    categories: [
        {
            type: String,
            required: true
        }
    ]
})

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;