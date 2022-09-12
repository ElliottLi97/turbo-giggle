// see SignupForm.js for comments
import React, { useState } from 'react';
import { LOGIN_DOCTORS } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { main, logindoctor } from './styles';


const LoginDoctorForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    const [loginDoctors, {error}] = useMutation(LOGIN_DOCTORS);

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
                variables: { ...userFormData }
            });
            console.log("here")
            console.log("loginDoctors::: ", data)
            Auth.login(data.loginDoctors.token, "doctor");

        } catch (e) {
            console.error(error);
            
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div style={main.container}>
            <div className="row" style={main.row}>
                <div className="card my-0" style={main.card}>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={main.form}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
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
                        <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                            Not Registered?{" "}
                            <a href="/doctors-signup" className="login-link text-dark fw-bold">
                                Sign up instead
                            </a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginDoctorForm;
