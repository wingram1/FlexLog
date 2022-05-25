import { gql } from '@apollo/client';

export const QUERY_ME =  gql`
    {
        me  {
            _id
            username
            email
            myWorkouts {
                _id
                title
                description
                categories 
                exercises {
                    _id
                    name
                    icon
                    settings {
                        _id
                        sets
                        reps
                        distance
                        timer
                        rest
                    }
                }
            }
            mySessions

        }
    }
`;

export const QUERY_USERS = gql`

`;

export const QUERY_USER = gql`
    query user($id: ID!) {
        user(_id: $id) {
            _id
            username
            email
            myWorkouts {
                _id
                title
                description
                categories 
                exercises {
                    _id
                    name
                    icon
                    settings {
                        _id
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
