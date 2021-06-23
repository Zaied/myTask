import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import * as Cookies from 'js-cookie'

const Login = (props) => {
    return (
        <Container className="section">
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    {props.errorMsg}
                    {props.successMsg}
                    <Form onSubmit={props.login}>
                        <h2>Login Form </h2>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={props.email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={props.password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Login
