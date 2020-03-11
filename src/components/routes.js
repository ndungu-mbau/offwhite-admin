import React from "react"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('authorization')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export const createProtectedRoute = (...levels) => ({ component: Component, ...props }) => {
  const { type } = JSON.parse(localStorage.getItem("user"))
  return (
  <PrivateRoute
    {...props}
    component={routeProps => 
      (<Route
        {...routeProps}
        render={rProps => levels.includes(type) ? <Component {...rProps} /> : <Redirect to="/" />
      }
    />)
  }/>)
}