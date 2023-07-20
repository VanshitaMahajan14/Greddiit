import React from 'react';
import {Redirect, Routes,Route} from 'react-router-dom';



const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render=
  {
    props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to=
      {{
        pathname: '/login',
        state: { from: props.location }
      }} 
      />
    )
  )} />
);


export default ProtectedRoute;
