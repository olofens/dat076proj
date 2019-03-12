import React from "react";
import { BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
    <div>
        <Route {...rest} render={(props) => (
            auth === true
                ? (<Component {...props} />)
                : (<Redirect to='/login' />)
        )} />
    </div>
)

export default (PrivateRoute);