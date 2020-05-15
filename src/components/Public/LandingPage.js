import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Script} from '../../utils/ToggleScript';
// import axios from 'axios';
import axios from '../../services/axiosInstance'
import Loader from "../Common/Loader";
import './Styles.css';

//function to render all posts
const Post = (props) => (
  <div className={props.case.status==='resolved' ? 'alert alert-success mb-2' : 'alert alert-dark mb-2'}>
    <h5>Organization: {props.orgs[props.case.orgId]}</h5>
    <p className="mb-0">{props.case.place}, {props.case.date}</p>
  </div>
)

class LandingPageNav extends Component {

  componentDidMount () {
    if (!document.getElementById("publicNavBar")) {
      Script.append("publicNavBar", "/scripts/publicNavBar.js");
    }
  }

  render() {
    return(
      <div className="navbar navbar-expand-sm navbar-dark sticky-topp mb-0 shownav bg-primary" id="navbar">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src='/images/bprd_logo.png' alt="logo" style={{width: '80px'}}/>
            <span> &nbsp; BPRD PUBLIC HOME</span>
          </Link>

          <button className="navbar-toggler justify-content-end" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/org">Organization Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Login</Link>
              </li>
            </ul>
          </div>	
        </div>
      </div>
    )
  }
}

class Intro extends Component {
  render() {
    return(
      <section className="container-fluid text-center d-flex align-items-center justify-content-center py-5 m-0" id="intro">
        <div className="container">
          <img className="mb-3" alt="img" src="/images/bprd_logo.png" width="250px"/>
          <h1 className="mb-3">Bureau of Police Research and Development</h1>
          <p className="mb-4">The Bureau of Police Research and Development (BPR&D), was set up on 28 August 1970 in furtherance of the objective of the Government of India for the modernisation of police forces. It has evolved as a multifaceted, consultancy organisation. At present it has 4 divisions – Research, Development, Training and Correctional Administration.</p>
          <button className="btn btn-danger mb-2 mr-2">Click Here</button>
          <button className="btn btn-light mb-2">Click Here</button>
        </div>
      </section>
    )
  }
}

class Section2 extends Component {

  render() {
    return(
      <section className="text-center py-5" id="section2">
        <div className="container p-5">
          <h1 className="mb-5">Choose from below options</h1>
          <div className="row pt-5">

            <div className="col-md-4 pb-4">
              <div className="mycard">
                <div className="card-body">
                  <img className="p-4" alt="img" src='/images/m1.png'/>
                  <h4>Register Complaint</h4>
                  <hr/>
                  <p>Mobirise is an easy website builder - just drop site elements to your page, add content and style it to look the way you like.</p>
                  <Link to="/"><button className="btn btn-primary">Register</button></Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 pb-4">
              <div className="mycard">
                <div className="card-body">
                  <img className="p-4" alt="img" src="/images/m2.png"/>
                  <h4>Track Complaint</h4>
                  <hr/>
                  <p>Mobirise is an easy website builder - just drop site elements to your page, add content and style it to look the way you like.</p>
                  <Link to="/status"><button className="btn btn-primary">Track Status</button></Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 pb-4">
              <div className="mycard">
                <div className="card-body">
                  <img className="p-4" alt="img" src="/images/m3.png"/>
                  <h4>Send Reminder</h4>
                  <hr/>
                  <p>Mobirise is an easy website builder - just drop site elements to your page, add content and style it to look the way you like.</p>
                  <Link to="/"><button className="btn btn-primary">Remind</button></Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }
}

class Reports extends Component {

  showReports() {
    return this.props.posts.map((currentPost, i)=>{
      return <Post case={currentPost} orgs={this.props.orgs} key={i} />
    })
  }

  render() {
    return(
      <section id="cases">
        <div className="container py-5">
          <h1 className="text-center mb-5">Newly Registered Complaints</h1>
          {this.showReports()}
          <Link to="public"><button className="btn btn-primary mt-4">View All</button></Link>
        </div>
      </section>
    )
  }
}

class Stats extends Component {
  
  renderStats() {
    return (
      <div className="row d-flex justify-content-center pt-5">

				<div className="col-md-3 pb-4">
					<div className="mycard statsbox">
						<div className="card-body text-center py-5">
							<i className="fa fa-4x fa-briefcase text-success mb-1"></i>
							<hr/>
							<h3>{this.props.count.received}</h3>
							<h4>Received Complaints</h4>
						</div>
					</div>
				</div>
				<div className="col-md-3 pb-4">
					<div className="mycard statsbox">
						<div className="card-body text-center py-5">
							<i className="fa fa-4x fa-trophy text-primary mb-1"></i>
							<hr/>
							<h3>{this.props.count.resolved}</h3>
							<h4>Resolved Complaints</h4>
						</div>
					</div>
				</div>
				<div className="col-md-3 pb-4">
					<div className="mycard statsbox">
						<div className="card-body text-center py-5">
							<i className="fa fa-4x fa-hourglass text-secondary mb-1"></i>
							<hr/>
							<h3>{this.props.count.pending}</h3>
							<h4>Pending Complaints</h4>
						</div>
					</div>
				</div>
			</div>
    )
  }

  render() {
    return(
      <section id="stats" className="py-5">
        <div className="container px-5 pt-5">
          <h1 className="text-center mb-5">Check the statistics</h1>
        {this.renderStats()}
        </div>
      </section>
    )
  }
}

class CurveChart extends Component {

  componentDidMount () {
    if (!document.getElementById("publicChart")){
      Script.append("publicChart", "/scripts/charts/publicChart.js")
    }
  }

  render() {
    return(
      <div id="chartContainer">
        <div className="container px-5 pb-5">
          <div className="row d-flex justify-content-center pt-4">
            <div className="col-md-9">
              <h2 className="text-center mb-5">Visual Representation</h2>
              <div id="curve_chart"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default class LandingPage extends Component {

  state = {
    loaded: false,
    posts: [],
    orgs: {},
    count: {}
  }

  componentDidMount() {
    // axios.get('http://localhost:4444/')
    axios.get('/')
    .then(response=>{
      this.setState({
        posts: response.data.posts,
        orgs: response.data.orgs,
        count: response.data.count,
        loaded: true
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    if (!this.state.loaded) return <Loader/>
    return(
      <div>
        < LandingPageNav />
        < Intro />
        < Section2 />
        < Reports posts={this.state.posts} orgs={this.state.orgs} />
        < Stats count={this.state.count} />
        < CurveChart />
      </div>
    )
  }
}