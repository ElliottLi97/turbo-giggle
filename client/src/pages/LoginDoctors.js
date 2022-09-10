// see SignupForm.js for comments
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Alert } from "react-bootstrap";
import { LOGIN_DOCTORS } from "../utils/mutations";
import Auth from "../utils/auth";
import { LoginStyles, logindoctor } from "./styles";

const LoginDoctor = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [loginDoctors] = useMutation(LOGIN_DOCTORS);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

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
      const { data } = await loginDoctors({
        variables: { ...userFormData },
      });
      console.log(data);

      // Auth.login(data.loginDoctors.token);
      Auth.login(data.loginDoctors.token, data.loginDoctors.patient.doctor);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div style={LoginStyles.container}>
      <div className="row" style={LoginStyles.row}>
        <div className="col-md-6 offset-md-3">
          <div className="card my-5" style={LoginStyles.card}>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
              >
                Something went wrong with your login credentials!
              </Alert>
              <div className="text-center">
                <img
                  src={logindoctor}
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="150px"
                  alt="profile"
                />
              </div>
              {/* <div className="mb-3" style={LoginStyles.epbutton}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email-login"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                />
                            </div> */}
              <Form.Group>
                {/* <Form.Label htmlFor='email'>Email</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Your email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email is required!
                </Form.Control.Feedback>
              </Form.Group>
              {/* <div className="mb-3" style={LoginStyles.epbutton}>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password-login"
                                    placeholder="Password"
                                />
                            </div> */}
              <Form.Group>
                {/* <Form.Label htmlFor='password'>Password</Form.Label> */}
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
              {/* <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                                    Login
                                </button>
                            </div> */}

              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{" "}
                <Button
                  disabled={!(userFormData.email && userFormData.password)}
                  type="submit"
                  variant="success"
                >
                  Submit
                </Button>
                <br></br>
                <br></br>
                <a
                  href="/doctors-signup"
                  className="login-link text-dark fw-bold"
                >
                  Sign up instead
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDoctor;
