const db = require('../config/connection');
const { User, Workout } = require('../models');

const userData = require('./UserData.json');
const workoutData = require("./WorkoutData.json");

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Workout.deleteMany({});

        await User.create(userData);

        for  (let i = 0; i < workoutData.length; i++) {
            const { _id, createdBy  } = await Workout.create(workoutData[i]);
            const user = await User.findOneAndUpdate(
                { username: createdBy },
                {
                    $addToSet: {
                        workouts: _id,
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
        
    console.log('All done!')
    process.exit(0);
});