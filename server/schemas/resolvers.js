const { User, Workout } = require('../models');
const  { AuthenticationError  } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('myWorkouts')
                    .populate('mySessions');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('myWorkouts')
                .populate('mySessions');
        },

        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
                .populate('myWorkouts')
                .populate('createdWorkouts'); 
        },

        // workouts: async () => {
        //     return Workout.find().populate('createdBy');
        // },

        // workout: async (parent, { _id }) => {
        //     return Workout.findOne({ _id });
        // },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user};
        },

        addWorkout: async (parent, args, context) => {  
            if (context.user) {
                const workout = await Workout.create(args.input);
                console.log(workout);
                const updatedUser = await User.findOneAndUpdate(
                    {  _id: context.user._id},
                    { $addToSet: { createdWorkouts: workout.id } },
                    { new: true }
                    ).populate('createdWorkouts');
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in');
        },
        removeWorkout: async (parent, args, context) => {
            if (context.user) {

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $pull: { createdWorkouts: args._id } },
                        { new: true, runValidators: true },
                        ).populate('createdWorkouts');
                    return updatedUser;
    
            }

            throw new AuthenticationError('You are not logged in');
        },
        saveWorkout: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedWorkouts: args._id } },
                    { new: true },
                    ).populate('savedWorkouts')
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in');
        },
        unsaveWorkout: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: {  savedWorkouts: args._id } },
                    { new: true}
                    ).populate('savedWorkouts');
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in');
        }
    }
};

module.exports = resolvers;