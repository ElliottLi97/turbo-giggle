// see SignupForm.js for comments
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Alert } from "react-bootstrap";
import { LOGIN_PATIENTS } from "../utils/mutations";
import Auth from "../utils/auth";
import { LoginStyles, loginpatient } from "./styles";

const styles = {
  formcontrol: {
    backgroundColor: "transparent",
    border: "none !important",
    display: "block",
    width: "100%",
    height: "calc(1.5em + .75rem + 2px)",
    padding: ".375rem .75rem",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#495057",
    backgroundClip: "padding-box",
    borderRadius: "0.25rem",
    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
  },
  button: {
    margin: "auto",
  },
};

const LoginForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [loginPatients] = useMutation(LOGIN_PATIENTS);

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
      const { data } = await loginPatients({
        variables: { ...userFormData },
      });
      console.log(data);

      Auth.login(data.loginPatients.token, data.loginPatients.patient.doctor);
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
        <div className="col-md-6">
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
                  src={loginpatient}
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="150px"
                  alt="profile"
                />
              </div>
              <Form.Group>
                {/* <Form.Label htmlFor='email'>Email</Form.Label> */}
                <Form.Control
                  class="md-3"
                  style={styles.formcontrol}
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
              <Form.Group>
                {/* <Form.Label htmlFor='password'>Password</Form.Label> */}
                <Form.Control
                  class="md-3"
                  style={styles.formcontrol}
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

              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                {" "}
                <Button
                  class="btn btn-color px-5 mb-5 w100"
                  style={styles.button}
                  disabled={!(userFormData.email && userFormData.password)}
                  type="submit"
                  variant="success"
                >
                  Submit
                </Button>
                <br></br>
                <br></br>
                Not Registered?{" "}
                <a href="/signup" className="login-link text-dark fw-bold">
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

export default LoginForm;
