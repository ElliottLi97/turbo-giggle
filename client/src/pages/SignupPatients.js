import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

import { ADD_PATIENTS } from '../utils/mutations';
import Auth from '../utils/auth';

import { main, singuppatient } from './styles';

const SignupForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [addPatients] = useMutation(ADD_PATIENTS);

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
            const { data } = await addPatients({
                variables: { ...userFormData }
            });
            Auth.login(data.addPatients.token, "patient");

        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div className="container" style={main.container}>
            <div className="row" style={main.row}>
                <div className="card my-0" style={main.card}>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={main.form}>
                        {/* show alert if server response is bad */}
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
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
                            {/* <Form.Label htmlFor='firstName'>First Name</Form.Label> */}
                            <Form.Control
                                type='firstName'
                                placeholder='Your first name'
                                name='firstName'
                                onChange={handleInputChange}
                                value={userFormData.firstName}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>A First Name is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label htmlFor='lastName'>Last Name</Form.Label> */}
                            <Form.Control
                                type='lastName'
                                placeholder='Your last name'
                                name='lastName'
                                onChange={handleInputChange}
                                value={userFormData.lastName}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>A Last Name is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label htmlFor='username'>Username</Form.Label> */}
                            <Form.Control
                                type='text'
                                placeholder='Your username'
                                name='username'
                                onChange={handleInputChange}
                                value={userFormData.username}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label htmlFor='email'>Email</Form.Label> */}
                            <Form.Control
                                type='email'
                                placeholder='Your email address'
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
                            disabled={!(userFormData.firstName && userFormData.lastName && userFormData.username && userFormData.email && userFormData.password)}
                            type='submit'
                            variant='success'>
                            Submit
                        </Button>
                        </Form.Group>
                        <div className="form-text text-center mb-5 text-dark">
                            <a href="/" className="login-link text-dark fw-bold">
                                Log in instead
                            </a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
