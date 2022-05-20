const { Schema, model } = require('mongoose');
const exerciseSchema = require("./Exercise");

const WorkoutSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    categories: [
        {
            type: String,
            required: true
        }
    ],
    exercises: [exerciseSchema],
    createdBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    },
    {
        toJSON: {
            getters: true   
        }
    });



const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;