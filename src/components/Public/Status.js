import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {Script} from '../../utils/ToggleScript';
// import axios from 'axios';
import axios from '../../services/axiosInstance'
// import Loader from "../Common/Loader";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <ul className="navbar-nav">
        <li className="nav-item activ">
          <a className="nav-link" href="/">Public Home</a>
        </li>
      </ul>
    </nav>
  )
}

function Header() {
  return (
    <div className="jumbotron text-center mb-5">
      <h2>CHECK STATUS</h2>
    </div>
  )
}

export default class Status extends Component{

  state = {
    errmessage: null,
    caseId: '', email: ''
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('/status', {
      caseId: this.state.caseId, email: this.state.email
    }, {responseType: 'blob'})
    .then(res=>{
      console.log(res.status)
      if (res.status === 200) {
        const file = new Blob(
          [res.data],
          {type: 'application/pdf'}
        );
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        // window.open(fileURL);
        window.location = fileURL
      }
    })
    .catch(err=>{
      if (err.message==='Network Error') this.setState({ error: true, errmessage: err.message })
      else if (err.response && err.response.status === 404) this.setState({errmessage: 'Wrong case ID/ email entered!'})
      else this.setState({errmessage: `Some error occured or can't reach server` })
    })
  }

  showError() {
    if (this.state.errmessage) return (<div className='alert alert-danger'><b>{this.state.errmessage}</b></div>)
  }

  render() {
    return (
      <div>
        <Nav />
        <Header />
  
        <div className="container">
          
          <div className="row d-flex justify-content-center">
            <div className="col-md-7">

              {this.showError()}

              <form method="post" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label>Case ID:</label>
                  <input className="form-control" name="caseId" type="text"
                    pattern="^[a-zA-Z0-9_]*$" placeholder="Enter Case ID" required 
                    value = {this.state.caseId}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label>Email ID:</label>
                  <input className="form-control" placeholder="Enter email" name="email" required
                    value = {this.state.email}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
  
        </div>
      </div>
    )
  }
}