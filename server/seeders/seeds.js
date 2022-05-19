const db = require('../config/connection');
const { User, Workout } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Workout.deleteMany({});
    // create User data
    const userData = [];

    const username = 'TestSubject';
    
    userData.push({ username });


    // create Workout data


    console.log('All done!')
    process.exit(0);
});