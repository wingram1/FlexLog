const { User, Workout } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({})
                .populate('savedWorkouts')
                .populate('createdWorkouts');
        },
        workout: async (parent, { username }) => {
            const params = username ? { username } : {}; 
            return await Workout.find(params).populate('createdBy');
        }
    }
};

module.exports = resolvers;