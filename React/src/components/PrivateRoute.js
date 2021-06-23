import React, { useContext,useEffect,useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getToken, setToken } from '../auth/token';

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                getToken()?.length>20
                        ? (children)
                        :
                        (<Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />)
                }
            />
        </div>
    );
};

export default PrivateRoute;