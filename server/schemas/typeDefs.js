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

    input Settings {
        _id: ID!
        sets: Int
        reps: Boolean
        distance:  Boolean
        timer: String
        rest: Int
    }
    output Exercise {
        _id: ID!
        name: String
        icon: String
        settings: [Settings]!
    }
    type Workout {
        _id: ID!
        title: String
        description: String
        creator: String!
        categories: [String]!
        exercises: [Exercise]!
        createdBy: [User]
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
        addWorkout(
            title: String,
            description: String,
            creator: String!,
            categories: [String]!
        ) : Workout
    }
`;

module.exports = typeDefs;