import React, { useEffect, useState} from 'react';
import { Route, Redirect } from "react-router-dom";
import axios from '../../services/axiosInstance'


// const AdminRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
          //(Auth.isAuthenticated===true)
//       ? <Component {...rest} {...props} />
//       : <Redirect to='/admin/login' />
//   )
//   } />
// )

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    async function getAuth(){
      let response = await axios.get('/admin/', { withCredentials: true })
      if (!response.data.user) setIsAuthenticated(false)
      else if (response.data.user.adminId==='admin') {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }
    getAuth()
  }, [])

  if(isAuthenticated === null){
    return null
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/admin/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
}


export const MinistryRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getAuth(){
      let response = await axios.get('/ministry/', { withCredentials: true })
      console.log('from min route\n', response);
      if (!response.data.user) setIsAuthenticated(false)
      else if (response.data.user.ministryId) {
        setUser(response.data.user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }
    getAuth()
  }, [])

  if(isAuthenticated === null){
    return null
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/ministry/login'/>
      ) : (
        <Component  user={user} {...props} />
      )
    }
    />
  );
}