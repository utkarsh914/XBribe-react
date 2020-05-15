import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from '../../services/axiosInstance'
import Loader from "../Common/Loader";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      error: false,
      errormsg: null,
      orgId: null,
      password: null,
      redirectTo: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/org/login', {
      orgId: this.state.orgId,
      password: this.state.password
    },  { withCredentials: true } )
    .then(response=>{
      if (response.status === 200) {
        this.setState({ redirectTo: '/org/dashboard' }, ()=>{
          this.props.setLoggedIn(response.data.user)
        })
      }
    })
    .catch(err=>{
      //for network error
      if (err.message==='Network Error') this.setState({ error: true, errormsg: err.message })
      // for authentication failed error: 401 unauthorized
      else if (err.response && err.response.status === 401) this.setState({ error: true, errormsg: 'Wrong ID/password combination' })
      else this.setState({ error: true, errormsg: `Some error occured or can't reach server` })
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loaded: true })
  }

  showError() {
    if (this.state.error) {
    return (<div className='alert alert-danger'><b>{this.state.errormsg}</b></div>)
    }
  }

  render() {
    if (!this.state.loaded) return <Loader/>
    if (this.state.redirectTo) {
      return ( <Redirect to={{ pathname: this.state.redirectTo }} /> )
    }
    else return(
      <div>

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Go to Public Home</Link>
            </li>
          </ul>
        </nav>

        <div className="jumbotron text-center mb-5">
          <h2>ORGANIZATION LOGIN</h2>
        </div>


        <div className="container">
          
          <div className="row d-flex justify-content-center">
            <div className="col-md-7">
              {this.showError()}
              <form onSubmit={this.handleSubmit} >
                <div className="form-group">
                  <label>Organization ID:</label>
                  <input className="form-control" name="orgId" type="text" pattern="^[a-zA-Z0-9_]*$" placeholder="Enter Organization ID" required
                    // value={this.state.adminId}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                <label>Password:</label>
                  <input className="form-control" placeholder="Enter password" name="password" type="password" required
                    // value={this.state.password}
                    onChange={this.handleChange}
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