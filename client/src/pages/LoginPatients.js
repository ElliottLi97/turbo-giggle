// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_PATIENTS } from '../utils/mutations';
import Auth from '../utils/auth';
import { main, loginpatient } from './styles';


const LoginForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

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
                variables: { ...userFormData }
            });
            console.log("Patient Data:" + data);

            Auth.login(data.loginPatients.token, "patient");

        } catch (e) {
            console.error(e);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div style={main.login}>
            <div style={main.row}>
                <div className="card my-0" style={main.card}>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={main.form}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
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
                                type='text'
                                placeholder='Your email'
                                name='email'
                                onChange={handleInputChange}
                                value={userFormData.email}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label htmlFor='password'>Password</Form.Label> */}
                            <Form.Control
                                type='password'
                                placeholder='Your password'
                                name='password'
                                onChange={handleInputChange}
                                value={userFormData.password}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                            <Button 
                                style={main.epbutton}
                                disabled={!(userFormData.email && userFormData.password)}
                                type='submit'
                                variant='success'>
                                Submit
                            </Button>
                        </Form.Group>
                        <div id="emailHelp" className="form-text text-center mb-5 text-dark" >
                            Not Registered?{" "}
                            <a href="/signup" className="login-link text-dark fw-bold">
                                Sign up instead
                            </a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
