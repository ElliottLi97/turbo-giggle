const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Patients {
        _id: ID
        username: String
        name: String
        email: String
    }   
    
    type AuthPatients {
        token: ID!
        patient: Patients
    }

    type Doctors {
        _id: ID
        username: String
        name: String
        email: String
    }

    type AuthDoctors {
        token: ID!
        doctor: Doctors
    }

    type User {
        _id: String
        email: String
    }

    type Query {
        test: String
        testUser: Patients
        currentUser: User
        me: Patients
        patients: [Patients]
        mydoctors: [Doctors]
        patient(username: String!): Patients
        doctor(username: String!): Doctors
    }

    type Mutation {
        loginPatients(email: String!, password: String!): AuthPatients
        addPatients(username: String!, email: String!, password: String!): AuthPatients 
        loginDoctors(email: String!, password: String!): AuthDoctors
        addDoctors(username: String!, email: String!, password: String!): AuthDoctors 
    }

`;

module.exports = typeDefs;