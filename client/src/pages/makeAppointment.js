import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import {GET_ALL_DOCTORS,  GET_PATIENT } from '../utils/queries';
import Auth from '../utils/auth';
import "../css/style.css";
import { dashboard, appointments, addappointments, history, edit, chatlogin, doctorProfile } from './styles';

const DashboardPatients = (props) => {
    const userData = Auth.getProfile();
    const {loading: loadingDocs, error: DocError, data: doctorData} = useQuery(GET_ALL_DOCTORS);
    const {loading: loadingPatient, error: patientError, data: patientData} = useQuery(GET_PATIENT, {variables: {_id: userData.data._id}});
    if (loadingDocs) {
      return <h2>LOADING Doctors...</h2>;
    }
    if (DocError) return `Error! ${DocError.message}`;
  
    if (loadingPatient) {
        return <h2>LOADING Patient Information...</h2>;
      }
      if (patientError) return `Error! ${patientError.message}`;
    return (
      <div style={dashboard.container}>
        <p className='loggedInAs mb-4'>
            LoggedIn As: <strong>{patientData.getPatient.lastName}, {patientData.getPatient.firstName}</strong>!
          </p>
        <header style={dashboard.header}>
          <h1>
            <strong>Make an appointment with: </strong>
          </h1>
          <p>
            This is a secure medical portal to help connect and provide you with
            access and tools to assist you with your medical needs
          </p>
        </header>
        {/* <div>{JSON.stringify(data)}</div> */}
        {doctorData?.getDoctors?.map(item => (
          <div className="card mb-3 flex-row" key={item._id}>
            <div className="row no-gutters">
              <div className="col-auto">
                <img className="card-img-left" src={doctorProfile} alt="Card image cap"></img>
              </div>
            </div>
            <div className="col">
              <div className="card-body">
                <h5 className="card-title">{item.firstName}, {item.lastName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Type of Doctor</h6>
                <p className="card-text">{item.email}</p>
                <a href={'/makeAppointmentForm?doctorId=' + item._id} className="card-link">Make an Appointment</a>
                <a href="#" className="card-link">Message</a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashboardPatients;