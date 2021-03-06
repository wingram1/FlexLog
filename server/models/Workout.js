const { Schema, model } = require('mongoose');


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
        required: false
    },
    
},
);

const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        settings: [settingsSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);



const workoutSchema = new Schema({
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
    exercises: [exerciseSchema]
    ,
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



const Workout = model('Workout', workoutSchema);

module.exports = Workout;