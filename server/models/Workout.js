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
            id: 0,
            name: 'Plank',
            icon: '',
            settings: {
                sets: 1,
                reps: false,
                distance: false,
                timer: countdown,
                rest: 30
            }
        },
        {
            id: 1,
            name: 'Pushup',
            icon: '',
            settings: {
                sets: 3,
                reps: true,
                distance: false,
                timer: '',
                rest: 30
            }
        },
        {
            id: 2,
            name: 'Running',
            icon: '',
            settings: {
                sets: 1,
                reps: false,
                distance: true,
                timer: stopwatch,
                rest: 30
            }
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