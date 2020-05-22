import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
// import PrivateRoute from '../Common/PrivateRoute'
import Login from "./Login";
import OrgDashboard from "./OrgDashboard";

const Auth = {
  //store the auth state in localStorage so that it doesn't change on browser refresh
  //default it to false to login everytime(although only client side will be logged out, server still has the client logged in)
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  role: JSON.parse(localStorage.getItem('role')) || 'org',
  user: JSON.parse(localStorage.getItem('user')) || null,
  authenticate(user) {
    if (!user) return
    this.isAuthenticated = true
    this.role = 'org'
    this.user = user
    localStorage.setItem('isAuthenticated', JSON.stringify(true))
    localStorage.setItem('role', JSON.stringify('org'))
    localStorage.setItem('user', JSON.stringify(user))
    console.log('Logged in!')
  },
  signout() {
    this.isAuthenticated = false
    this.orgId = null
    this.orgName = null
    localStorage.setItem('isAuthenticated', JSON.stringify(false))
    localStorage.setItem('role', JSON.stringify(null))
    localStorage.setItem('user', JSON.stringify(null))
    console.log('Logged out!')
    // cb(null)
  }
}

const OrgRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (Auth.isAuthenticated===true)
      ? <Component {...rest} {...props} />
      : <Redirect to='/org/login' />
  )} />
)

export default function Organization() {
  return (
    <div>
      <Switch>
        <Route exact path="/org" render={ ()=> <Redirect to={{ pathname: '/org/dashboard' }} />} />
        {/* <Route exact path="/org" render={ ()=> <h1>Hello !</h1>} /> */}
        <Route exact path="/org/login" render={()=>
          <Login setLoggedIn={(user)=>Auth.authenticate(user)} />
        }/>
        <OrgRoute exact path="/org/dashboard" user={Auth.user} setLoggedOut={()=>Auth.signout()} component={OrgDashboard} />
      </Switch>
    </div>
  )
}
