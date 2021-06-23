import React from 'react'
import { useHistory } from "react-router-dom";
import UserContext, { UserConsumer } from '../context/UserContext'
import useLocalStorage from '../useLocalStorage';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { removeToken } from '../auth/token';



const Home = () => {
    const history = useHistory();

    const logOutHandler = () => {
        removeToken();
        localStorage.removeItem('user');
        history.replace("/login");
        history.go(0)
    }

    return (
        <Container className="section">
            <Row className="justify-content-md-center">
                <Col sm={8}>
                    <UserConsumer>
                        {(context) => {
                            return (
                                <div>

                                    {
                                        context.user ? <div>
                                            <h2>Dashboard: User profile</h2>
                                            <h4>Currrent User Name: {context ?.user.userName}</h4>
                                            <h4>Currrent User Email: {context ?.user.userEmail}</h4>
                                            <Button onClick={logOutHandler}>Logout</Button> </div> : <div>
                                                <h2>Home Page</h2>
                                            </div>
                                    }

                                </div>
                            )
                        }}
                    </UserConsumer>
                </Col>
            </Row>
        </Container>
    )
}

export default Home