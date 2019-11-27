import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from './lib/auth'

const SecureRoute = ({ component, ...rest }) => {

  if (Auth.isItMel()) return <Route component={component} {...rest} />

  // else
  Auth.removeToken()
  return <Redirect to='/isItMel'/>

}

export default SecureRoute
