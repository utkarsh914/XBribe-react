import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { AdminRoute } from '../Common/PrivateRoutes'
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";

function Admin() {
  return (
    <div>
      <Switch>
        <Route exact path="/admin" render={ ()=> <Redirect to={{ pathname: '/admin/dashboard' }} />} />
        <Route exact path="/admin/login" render={()=>
          <Login />
        }/>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </div>
  )
}

export default Admin;
