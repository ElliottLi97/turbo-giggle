import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { GET_PATIENT_EMAIL_BY_ID, GET_ALL_DOCTORS, GET_PATIENT } from '../utils/queries';
import ChatLogin from "./Chat/ChatLogin";
import "../css/style.css";

import { dashboard, appointments, addappointments, history, edit, chatlogin, doctorProfile } from './styles';


const DashboardPatients = (props) => {
  const userData = Auth.getProfile();
  const {loading: loadingDocs, error: DocError, data: doctorData} = useQuery(GET_ALL_DOCTORS);
  const {loading:l, error:e, data:d} = useQuery(GET_PATIENT_EMAIL_BY_ID, {variables: { _id: userData.data._id }});
  const {loading: loadingPatient, error: patientError, data: patientData} = useQuery(GET_PATIENT, {variables: {_id: userData.data._id}});
  console.log(loadingPatient,patientError,patientData, "JAVI")
  console.log(d,e, l, "ELLIOTT")
  
  if (l) {
    return <h2>LOADING...</h2>;
  }
  //if (DocError) return `Error! ${DocError.message}`;

  return (
    <div style={dashboard.container}>
      <header style={dashboard.header}>
        <h1>
          Welcome <strong>{d.getPatientEmailByID.firstName} {d.getPatientEmailByID.lastName}</strong>!
        </h1>
        <p>
          his is a secure medical portal to help connect and provide you with
          access and tools to assist you with your medical needs
        </p>
      </header>
      {/* <div>{JSON.stringify(data)}</div> */}
      {/* {data?.getDoctors?.map(item => (
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
              <a href="#" className="card-link">Make an Appointment</a>
              <a href="#" className="card-link">Message</a>
            </div>
          </div>
        </div>
      ))} */}
      {/* HELP WITH THE GRAPHQL </div> */}
      
      <div style={dashboard.row}>
        <div className="col-sm col-xs-12">
          <div style={dashboard.card}>
            <div style={dashboard.alignment}>
              <img
                src={appointments}
                alt="image_of_appointments"
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
              />
              <br></br>
              <br></br>
              <h5 className="card-title">
                Upcoming Appointments
                <a
                  href="/appointments/signup"
                  className="edit-history-link-text"
                >
                  <img
                    style={dashboard.img}
                    alt="upcoming_appointments"
                    className="edit-history-link"
                    src={addappointments}
                  ></img>
                  Add{" "}
                </a>
              </h5>
              {/* Appointments  */}
              {/* <strong>FOR EACH APPOINTMENT</strong> */}
              <div
                className="col-sm col-xs-12 appointmentcard"
                style={dashboard.card}
              >
                <p className="card-text">
                  Dr. <strong>{d.getPatientEmailByID.primarycareteam[0].firstName} {d.getPatientEmailByID.primarycareteam[0].lastName} </strong> <br></br> at{" "}
                  <strong>Tuesday September 13th 2:30 PM</strong>
                </p>
                <p className="card-text">
                  Reason for visit: <strong>{d.getPatientEmailByID.appointments[0].concern}</strong>
                </p>
                <p className="card-text">
                  <strong>{d.getPatientEmailByID.appointments[0].status}</strong>
                </p>
              </div>
            </div>

            {/* Patient History */}
            <div className="col-sm col-xs-12">
              <div className="card" style={dashboard.card}>
                <div style={dashboard.alignment}>
                  <img
                    src={history}
                    alt="history alt"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  ></img>
                  <h5 className="card-title">
                    Patient History{" "}
                    <a href="/history" className="edit-history-link-text">
                      <img style={dashboard.img} src={edit} alt="edit img" />
                    </a>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Height: <strong>6' 2"</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Weight: <strong>150 lbs</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Allergies: <strong>Diphenhydramine</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Current Medications:<strong>Benadryl</strong>
                  </h6>
                  {/* <h6 className="card-subtitle mb-2 text-muted">
                    Prior History Data: <strong>PATIENT HISTORY DATA</strong>
                  </h6> */}
                </div>
              </div>
            </div>
            <div style={dashboard.row} className="row">
              <div className="card" style={dashboard.card}>
                <div style={dashboard.alignment}>
                  <img
                    src={chatlogin}
                    alt="image_of_appointments"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px"
                  />
                  {/* <h5 className="card-title">Chat Here!</h5> */}

                  <div className="col-sm col-xs-12">
                    <ChatLogin />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPatients;
