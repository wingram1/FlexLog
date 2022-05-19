// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        createdWorkouts: [Workout]
        savedWorkouts: [Workout]
    }

    type Workout {
        _id: ID 
        title: String
        description: String
        categories: [String]
        exercises: [Exercise]
        createdBy: [User]
    }

    type Exercise {
        _id: ID
        name: String
        icon: String
        settings: [Settings]
    }
    type Settings {
        _id: ID
        sets:  Int
        reps: Boolean
        timer: String
        rest: Int

    }
    type Query {
        users: [User]
        workout: [Workout]
        exercise: [Exercise]
        settings: [Settings]
    }
`;

module.exports = typeDefs;