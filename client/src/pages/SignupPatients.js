import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

import { ADD_PATIENTS } from "../utils/mutations";
import Auth from "../utils/auth";

import { SignupStyles, singuppatient } from "./styles";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addPatients] = useMutation(ADD_PATIENTS);
  //console.log("addPatients: ", addPatients)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log("HITTING THIS STILL");
      const { data } = await addPatients({
        variables: { ...userFormData },
      });
      console.log(data);
      // Auth.login(data.addUser.token);
      Auth.login(data.addPatients.token, data.addPatients.patient.doctor);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container" style={SignupStyles.container}>
      <div className="row" style={SignupStyles.row}>
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              {/* show alert if server response is bad */}
              <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
              >
                Something went wrong with your signup!
              </Alert>

              <div className="text-center">
                <img
                  src={singuppatient}
                  alt="cartoon of sickly man"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                />
              </div>
              <Form.Group>
                {/* <Form.Label htmlFor='username'>Username</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Your username"
                  name="username"
                  onChange={handleInputChange}
                  value={userFormData.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Username is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                {/* <Form.Label htmlFor='email'>Email</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password is required!
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-text text-center mb-5 text-dark">
                {" "}
                <Button
                  disabled={
                    !(
                      userFormData.username &&
                      userFormData.email &&
                      userFormData.password
                    )
                  }
                  type="submit"
                  variant="success"
                >
                  Submit
                </Button>
                <br></br>
                <br></br>
                <a href="/" className="login-link text-dark fw-bold">
                  Log in instead
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
