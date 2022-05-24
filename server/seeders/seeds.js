const { faker }  = require('@faker-js/faker');
const db = require('../config/connection');
const { User, Workout} = require('../models');

const userData = require('./UserData.json');
const workoutData = require("./WorkoutData.json");

db.once('open', async () => {
    
    await User.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany(userData);
    await Workout.insertMany(workoutData);
    // add createdWorkouts
    // for (createdWorkout of workouts) {
    //     const tempUser = users[Math.floor(Math.random() * users.length)];
    //     tempUser.workouts.push(createdWorkout._id);
    //     await tempUser.save();
    // }
       console.log('all done');
       process.exit(0);
});