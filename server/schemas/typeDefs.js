// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        createdWorkouts: [Workout]
        savedWorkouts: [Workout]
    }
    type Workout {
        _id: ID!
        title: String
        description: String
        categories: [String]
        exercises: [Exercise]
        createdBy: [User]
    }
    type Exercise {
        _id: ID!
        name: String!
        icon: String
        settings: [Settings]
    }
    type Settings {
        _id: ID!
        sets: Int
        reps: Boolean
        distance:  Boolean
        timer: String
        rest: Int
    }

    input WorkoutInput {
        title: String
        description: String
        categories: String
        exercises: [ExerciseInput]
    }

    input ExerciseInput {
        name: String!
        icon: String
        settings: [SettingsInput]
    }

    input SettingsInput {
        sets: Int
        reps: Boolean
        distance:  Boolean
        timer: String
        rest: Int
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        workouts: [Workout]
        workout(_id: ID!): Workout
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addWorkout(input: WorkoutInput): User
        removeWorkout(_id: ID!): User
        saveWorkout(_id: ID!): User
        unsaveWorkout(_id: ID!): User
    }
`;

module.exports = typeDefs;