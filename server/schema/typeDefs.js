const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Patients {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
    }   
    
    type AuthPatients {
        token: ID!
        patient: Patients
    }

    type Doctors {
        _id: ID
        firstName: String
        lastName: String
        username: String
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
        doctors: [Doctors]
        patient(username: String!): Patients
        doctor(username: String!): Doctors
        getDoctors:[Doctors]

        
        getPatients:[Patients]
        getPatientByID(_id: String!): Patients
        getDoctorByID(_id: String!): Doctors
    }

    type Mutation {
        loginPatients(email: String!, password: String!): AuthPatients
        addPatients(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): AuthPatients 
        loginDoctors(email: String!, password: String!): AuthDoctors
        addDoctors(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): AuthDoctors 
    }

`;

module.exports = typeDefs;