// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        myWorkouts: [Workout]
        mySessions: [String]
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
        
        name: String!
        icon: String
        settings: [Settings]
    }
    type Settings {
        
        sets: String
        reps: String
        distance:  String
        timer: String
        rest: String
    }

    input WorkoutInput {
        title: String
        description: String
        categories: [String]
        exercises: [ExerciseInput]
    }

    input ExerciseInput {
        name: String!
        icon: String
        settings: [SettingsInput]
    }

    input SettingsInput {
        sets: String
        reps: String
        distance: String
        timer: String
        rest: String
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(_id: ID!): User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addWorkout(input: WorkoutInput): User
        removeWorkout(_id: ID!): User
        saveWorkout(_id: ID!): User
        unsaveWorkout(_id: ID!): User
    }
`;

module.exports = typeDefs;