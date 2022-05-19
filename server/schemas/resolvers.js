const { User, Workout } = require('../models');

const resolvers = {
    Query: {
        users: [User]
    }
};

module.exports = resolvers;