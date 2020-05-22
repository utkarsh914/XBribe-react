// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axiosInstance'

function logout(props) {
  console.log('props of Nav at logout() fn\n', props)
  axios.get(`/${props.type}/logout`, { withCredentials: true })
  .then(response=>{
    console.log('admin logout response: ', response)
    if (response.status === 200) {
      props.setLoggedOut()
    }
  })
  .catch(err=> {
    console.log(err)
  })
}

export default function Nav(props) {

  let type = props.type
  let headerName = (type==='admin') ? 'ADMINISTRATOR': (type==='org') ? props.user.orgName : 'Public Portal'
  // let loggedIn = props.loggedIn

  if (type!=='admin') return null

  return(
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top card no-round">
      <div className="container">
        <Link className="navbar-brand" to="/admin">${headerName}</Link>
        <button className="navbar-toggler justify-content-end" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Public Home</Link>
            </li>
            
            {(type!=='admin') ? null: 
              <li className="nav-item">
                <Link className="nav-link" to="/admin/manage-org">Manage Organizations</Link>
              </li>
            }
            
            <li className="nav-item">
              <div className="nav-link modal-toggle" data-toggle="modal" data-target="#filterModal">Filter Reports</div>
            </li>
            <li className="nav-item">
              <div className="nav-link logout-btn" onClick={()=>logout(props)}>Logout</div>
            </li>
          </ul>
        </div>	
      </div>
    </nav>
  )
}