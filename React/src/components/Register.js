import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import axios from '../axios';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [registerFailedError, setRegisterFailedError] = useState('');
    const [successMsg, setSuccessMsg] = useState('')

    const RegisterHandler = (e) => {
        e.preventDefault();
        setError('');
        if (name && email && password && confirmPassword) {
            var registerCredential = {
                name: name,
                email: email,
                password: password,
                c_password: confirmPassword
            }
            axios.post('user/register', registerCredential)
                .then(res => {
                    setSuccessMsg('Registeration Success! please login')
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setRegisterFailedError('')

                }).catch(error => {
                    setRegisterFailedError("Registration Failed! try again")
                    setSuccessMsg('')
                }); // catch error
        } else {
            setError('Please Fillup the fields!')
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <Container className="section">
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <h1>Register Form </h1>
                    {successMsg}
                    {registerFailedError}
                    <Form onSubmit={RegisterHandler}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={nameHandler} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={emailHandler} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={passwordHandler} />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={confirmPasswordHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                </Button>
                        {error}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;