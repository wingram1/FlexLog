// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        createdWorkouts: [Workout]
        savedWorkouts: [Workout]
    }
    type Workout {
        createdBy: [User]
        exercises: String
        categories: String
    } 
    type Query {
        users(username: String): [User]
    }
`;

module.exports = typeDefs;