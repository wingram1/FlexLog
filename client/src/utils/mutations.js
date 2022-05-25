import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!)  {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_WORKOUT = gql`
    mutation addWorkout($input: WorkoutInput) {
        addWorkout(input: $input) {
            username 
            myWorkouts {
                _id
                title
                description
                categories 
                exercises {
                    
                    name
                    icon
                    settings {
                        
                        sets
                        reps
                        distance
                        timer
                        rest
                    }
                }
            }
        }
    }
`;