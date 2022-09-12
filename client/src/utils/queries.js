// import gql from 'graphql-tag';
import { gql } from '@apollo/client';

const getPatient = gql`
{
    me{
        firstName
        lastName
        email
        address
        gender
        appointments{
            status 
            concern 
            dateTime
            doctor
            patient
        }
        primarycareteam{
            name
            gender
            email
        }
        history{
            height
            weight
            allergies
            medications
            data
        }
    }
}`

const GET_PATIENT_EMAIL_BY_ID = gql`
    query GetPatientEmailByID {
        getPatientEmailByID (_id: $String) 
        {
            email
        }
    }
`

const getDoctor = gql`
{
    me{
        firstName
        lastName
        email
        gender
        appointments {
            status 
            concern 
            dateTime
            doctor
            patient
        }
    }
}`

const GET_ALL_DOCTORS = gql`
    query GetDoctors{
        getDoctors{
            _id
            firstName
            lastName
            email
        }
    }
`


export { getPatient, getDoctor, GET_ALL_DOCTORS, GET_PATIENT_EMAIL_BY_ID } 