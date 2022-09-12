// import gql from 'graphql-tag';
import { gql } from '@apollo/client';

export const LOGIN_PATIENTS = gql`
    mutation LoginPatients($email: String!, $password: String!) {
        loginPatients(email: $email, password: $password) {
            token
            patient {
                _id
                username
                firstName
                lastName
                email
            }
        }
    }
`;

export const ADD_PATIENTS = gql`
    mutation AddPatients($firstName:String!, $lastName:String!, $username:String!, $email:String!, $password: String!) {
        addPatients(firstName: $firstName, lastName: $lastName, username: $username, email:$email, password:$password) {
            token
            patient {
                _id
                username
                firstName
                lastName
                email
            }
        }
    }
`;
export const LOGIN_DOCTORS = gql`
    mutation LoginDoctors($email: String!, $password: String!) {
        loginDoctors(email: $email, password: $password) {
            token
            doctor {
                _id
                firstName
                lastName
                username
                email
            }
        }
    }
`;

export const ADD_DOCTORS = gql`
    mutation AddDoctors($firstName:String!, $lastName:String!, $username:String!, $email:String!, $password: String!){
        addDoctors(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
            token
            doctor {
                _id
                firstName
                lastName
                username
                email
            }
        }
    }
`;