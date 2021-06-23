import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import  UserContext,{UserProvider, UserConsumer}  from '../context/UserContext';
import { setToken, getToken } from '../auth/token';
import PrivateRoute from '../components/PrivateRoute'
import useLocalStorage from '../useLocalStorage';
import axios from '../axios'
import Home from './Home'
import Error from './Error'
import Navbar from './NavigationBar'
import Login from '../components/Login'
import Register from '../components/Register'
import Projects from '../components/projects/Projects'
import CreateProject from '../components/projects/CreateProject'
import AddMember from '../components/members/AddMember'
import Users from '../components/public/Users'
import { Layout } from '../components/Layout'


const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useLocalStorage('user');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const login = (e) => {
        e.preventDefault();
        var loginCredential = {
            email: email,
            password: password
        }
        axios.post('user/login', loginCredential)
            .then(res => {
                setSuccessMsg('Login Successful!')
                //console.log(res.data.data[0].token);
                setUser({
                    userName: res.data.data[1].name,
                    userEmail: res.data.data[1].email,
                });
                setToken(res.data.data[0].token)
                setErrorMsg('')
                
            }).catch(error =>{
                setErrorMsg("Login Failed")
                setSuccessMsg('')
            });
    }

   
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }


    return (
        <React.Fragment >
            <UserProvider value={{
                user:user
            }}>
                <Router>
                    <Navbar />
                    <Layout>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>

                            <Route exact path="/public-users">
                                <Users />
                            </Route>
                            
                            <PrivateRoute path="/new-project" > <CreateProject /> </PrivateRoute>
                            <PrivateRoute path="/projects"> <Projects /> </PrivateRoute>
                            <PrivateRoute path="/assign-member"> <AddMember /> </PrivateRoute>
                        
                            <Route path="/login">
                                <Login
                                    successMsg={successMsg}
                                    errorMsg={errorMsg}
                                    login={login}
                                    email={emailHandler}
                                    password={passwordHandler} />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="*">
                                <Error />
                            </Route>
                        </Switch>
                    </Layout>
                </Router>
            </UserProvider>
        </React.Fragment>
    )
}
export default Index