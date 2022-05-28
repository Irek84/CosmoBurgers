import React from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { updateTokenEnhancer } from '../../services/actions/user';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;
    const isRefreshTokenExist = 
        localStorage['refreshToken'] !== undefined;

    if(!isAccessTokenExist && isRefreshTokenExist)
        dispatch(updateTokenEnhancer());

    return (
        <Route
            {...rest}
            render={({location}) => isAccessTokenExist ? (
                children 
                ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />
                )
            }
        />
    );
}

export default ProtectedRoute;