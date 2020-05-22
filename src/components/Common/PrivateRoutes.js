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


export const OrgRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    async function getAuth(){
      let response = await axios.get('/org/', { withCredentials: true })
      if (!response.data.user) setIsAuthenticated(false)
      else if (response.data.user.orgId) {
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
        <Redirect to='/org/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
}