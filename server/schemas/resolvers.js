const { User, Workout } = require('../models');
const  { AuthenticationError  } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('savedWorkouts')
                    .populate('createdWorkouts');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedWorkouts')
                .populate('createdWorkouts');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('savedWorkouts')
                .populate('createdWorkouts'); 
        },

        workouts: async () => {
            return Workout.find().populate('createdBy');
        },

        workout: async (parent, { _id }) => {
            return Workout.findOne({ _id });
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect login');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect login');
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
                const  workout = await Workout.create({ ...args, creator: context.user.username  });

                await User.findByIdAndUpdate(
                    { _id: context.user._id  },
                    {  $push: { createdWorkouts: workout._id } },
                    { new: true }
                );

                return workout;
            }

            throw new AuthenticationError('You are not logged in');
        }
    }
};

module.exports = resolvers;