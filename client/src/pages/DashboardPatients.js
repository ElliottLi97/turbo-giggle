import React from "react";

import "../css/style.css";
import { getPatient } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import appointments from "../assets/appointments.png";
import addappointments from "../assets/add_appointments.png";
import history from "../assets/history.png";
import edit from "../assets/edit.png";

const styles = {
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: "-15px",
    marginLeft: "-15px",
    justifyContent: "center",
    marginTop: "200px",
    marginBottom: "200px",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    backgroundColor: "#9fafdf",
    backgroundClip: "border-box",
    borderRadius: ".25rem",
  },
  cardbody: {
    backgroundColor: "#9fafdf",
    padding: "15px 15px 15px 15px",
  },
  img: {
    height: "20px",
    width: "20px",
  },
  alignment: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
};

const DashboardPatients = (props) => {
  const { loading, error, data } = useQuery(getPatient);
  console.log(data)
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div style={styles.container}>
      {/* HELP WITH THE GRAPHQL </div> */}
      <h2 color="black !important">
        Welcome <strong>PATIENT NAME</strong>!
      </h2>
      <p>
        This is a secure medical portal to help connect and provide you with
        access and tools to assist you with your medical needs
      </p>
      <div style={styles.row}>
        <div className="col-sm col-xs-12">
          <div style={styles.card}>
            <div style={styles.alignment}>
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
                    style={styles.img}
                    alt="upcoming_appointments"
                    className="edit-history-link"
                    src={addappointments}
                  ></img>
                  Add{" "}
                </a>
              </h5>
              {/* Appointments  */}
              <strong>FOR EACH APPOINTMENT</strong>
              <div
                className="col-sm col-xs-12 appointmentcard"
                style={styles.card}
              >
                <p className="card-text">
                  Dr. <strong>DOCTOR NAME</strong> <br></br> at{" "}
                  <strong>APPOINTMENT DATE/TIME</strong>
                </p>
                <p className="card-text">
                  Reason for visit: <strong>APPOINTMENT CONCERN</strong>
                </p>
                <p className="card-text">
                  <strong>APPOINTMENT STATUS</strong>
                </p>
              </div>
            </div>

            {/* Patient History */}
            <div className="col-sm col-xs-12">
              <div className="card" style={styles.card}>
                <div style={styles.alignment}>
                  <img
                    src={history}
                    alt="history alt"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  ></img>
                  <h5 className="card-title">
                    Patient History{" "}
                    <a href="/history" className="edit-history-link-text">
                      <img style={styles.img} src={edit} alt="edit img" />
                    </a>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Height: <strong>PATIENT HISTORY HEIGHT</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Weight: <strong>PATIENT HISTORY WEIGHT</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Allergies: <strong>PATIENT HISTORY ALLERGIES</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Current Medications:{" "}
                    <strong>PATIENT HISTORY MEDICATIONS</strong>
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Prior History Data: <strong>PATIENT HISTORY DATA</strong>
                  </h6>
                </div>
              </div>
            </div>
            <div style={styles.row} className="row">
              <div className="col-sm col-xs-12">
                <div className="card" style={styles.card}>
                  <div style={styles.alignment}>
                    <h5 className="card-title">Chat Here!</h5>
                    <div className="col-sm col-xs-12">
                      <p className="card-text">
                        <strong>CHAT LOGIN</strong>
                      </p>
                    </div>
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
