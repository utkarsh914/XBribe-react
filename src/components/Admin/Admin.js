import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
// import PrivateRoute from '../Common/PrivateRoute'
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";

const Auth = {
  //store the auth state in localStorage so that it doesn't change on browser refresh
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  role: 'admin',
  authenticate() {
    this.isAuthenticated = true
    localStorage.setItem('isAuthenticated', JSON.stringify(true))
    console.log('Logged in!')
  },
  signout() {
    this.isAuthenticated = false
    localStorage.setItem('isAuthenticated', JSON.stringify(false))
    console.log('Logged out!')
    // cb(null)
  }
}

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (Auth.isAuthenticated===true)
      ? <Component {...rest} {...props} />
      : <Redirect to='/admin/login' />
  )} />
)

function Admin() {
  return (
    <div>
      <Switch>
        <Route exact path="/admin" render={ ()=> <Redirect to={{ pathname: '/admin/dashboard' }} />} />
        <Route exact path="/admin/login" render={()=>
          <Login setLoggedIn={()=>Auth.authenticate()} />
        }/>
        <AdminRoute exact path="/admin/dashboard" setLoggedOut={()=>Auth.signout()} component={AdminDashboard} />
      </Switch>
    </div>
  )
}

export default Admin;
