// import React, { Component, useEffect, useState } from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Script} from '../../utils/ToggleScript';
import axios from '../../services/axiosInstance'
// import Loader from "../Common/Loader";
// import storage from '../../services/FirebaseConfig'
import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBur7K4kMqyv04BpYvZPb6-PVZAeXfpbf0",
  authDomain: "bribery-test.firebaseapp.com",
  databaseURL: "https://bribery-test.firebaseio.com",
  projectId: "bribery-test",
  storageBucket: "bribery-test.appspot.com",
  messagingSenderId: "312584286294",
  appId: "1:312584286294:web:5485f6f836508a39690bf7",
  measurementId: "G-BGJFR4VFE3"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <ul className="navbar-nav">
        <li className="nav-item activ">
          <Link className="nav-link" to="/">Public Home</Link>
        </li>
      </ul>
    </nav>
  )
}

function Header() {
  return (
    <div className="jumbotron text-center py-4 mb-4">
    	<h2 className="w3-center">Register Your Case</h2>
    </div>
  )
}

class NewUser extends Component {

  state = {
    loaded: false,
    errormsg: null,
    email: ''
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    // axios.post('/report/newuser', { params: {email: this.state.email}, withCredentials: true })
    axios.post('/report/newuser', {email: this.state.email}, {withCredentials: true })
    .then(res=>{
      console.log(res.status, res.data.caseId)
      if (res.status === 200) {
        this.props.setUserRegistered()
      }
    })
    .catch(err=>{
      console.log(err)
      if (err.message==='Network Error') this.setState({ error: true, errormsg: err.message })
      else if (err.response && err.response.status === 404) this.setState({errormsg: 'Wrong case ID/ email entered!'})
      else this.setState({errormsg: `Some error occured or can't reach server` })
    })
  }

  showError() {
    if (this.state.errormsg) return (<div className='alert alert-danger'><b>{this.state.errormsg}</b></div>)
  }


  render() {
    return (
      <div className="container">
            
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
  
            {this.showError()}
  
            <form method="post" onSubmit={this.handleSubmit.bind(this)}>
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
    )
  }
}

// var formData = {}
class Upload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      picsArray: [],
      audiosArray: [],
      videosArray: []
    }
  }

  handleChange = (e) => {
    if (e.target.files)
      this.setState({ [e.target.name]: e.target.files })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let caseId = Math.random().toString(36).substr(2, 10).toUpperCase();
    if (e.target.id === "uploadPicsBtn") {
      this.batchUpload(caseId, 'pics', this.state.pics)
    }
    if (e.target.id === "uploadAudiosBtn") {
      this.batchUpload(caseId, 'audios', this.state.audios)
    }
    if (e.target.id === "uploadVideosBtn") {
      this.batchUpload(caseId, 'videos', this.state.videos)
    }
  }

  	//fn to batch upload pics, audios, videos one at a time using another fn named uploadFileAsPromise
  batchUpload = async (caseId, fileType, fileArray) => {
		console.log('batch upload ran for: ',caseId, fileType, fileArray)
    //return if vars not defined
    if (!fileArray) return
		if (fileArray.length === 0 || !fileType || !caseId) return
		if (!(fileType==='pics' || fileType==='audios' || fileType==='videos')) return
    
    //clear past files url
    if (this.state[`${fileType}Array`].length > 0)
      this.setState({[`${fileType}Array`]: []})
    
    //loop over all files and upload one by one
		for (let i = 0; i < fileArray.length; i++) {
			let path = `${caseId}/${fileType}/${fileArray[i].name}`
			let file = fileArray[i]
			await this.uploadFileAsPromise(file, path).then((url)=>{
        console.log('File available at', url);
        //store the url in state
        this.setState(oldState => (
          {
            [`${fileType}Array`]: [...oldState[`${fileType}Array`], url],
            [`${fileType}Uploaded`] : true
          }
        ))
        console.log(this.state[`${fileType}Array`])
      });
    }
    console.log('uploads success')
    //update addresses in parent form
    this.props.updateAddresses(
      this.state.picsArray,
      this.state.audiosArray,
      this.state.videosArray
    )
  }
  
	uploadFileAsPromise = (file, path) => {
    return new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref(path);
        var task = storageRef.put(file);

        //Update progress bar
        task.on('state_changed',
					(snapshot)=>{
						var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage)
            this.setState({ percentage: percentage })
					},
					(error)=>{
            console.log(error);
            this.setState({ error })
						reject(error);
					},
					()=>{
						task.snapshot.ref.getDownloadURL().then((downloadURL) => {
							resolve(downloadURL)
						});
					}
        );
    });
	}

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Attach Images:</label>
          {(!this.state.picsUploaded) ? 
            <button id="uploadPicsBtn" className="btn btn-primary" onClick={this.handleSubmit}>Upload</button> 
            :
            <button id="uploadPicsBtn" className="btn btn-success">Uploaded</button> 
          }
          <input className="form-control" name="pics" type="file" multiple
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Attach Audio Clips:</label>
          {(!this.state.audiosUploaded) ? 
            <button id="uploadAudiosBtn" className="btn btn-primary" onClick={this.handleSubmit}>Upload</button>
            :
            <button id="uploadAudiosBtn" className="btn btn-success">Uploaded</button>
          }
          <input className="form-control" name="audios" type="file" multiple
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Attach Videos:</label>
          {(!this.state.videosUploaded) ? 
            <button id="uploadVideosBtn" className="btn btn-primary" onClick={this.handleSubmit}>Upload</button>
            :
            <button id="uploadVideosBtn" className="btn btn-success">Uploaded</button>
          }
          <input className="form-control" name="videos" type="file" multiple
            onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}


class ReportForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orgId: 'MOAAFW_O128WQ',
      picsArray: [], audiosArray: [], videosArray: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    // formData[e.target.name] = e.target.value
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    // axios.get('/report/newuser', { params: {email: this.state.email}, withCredentials: true })
    axios.post('/report', this.state, {withCredentials: true })
    .then(res=>{
      console.log(res)
      if (res.status === 200) {
        // this.props.setUserRegistered()
        console.log('registered a case')
        this.props.setReportSuccess(
          res.data.data.caseId,
          res.data.data.email
        )
      }
    })
    .catch(err=>{
      console.log(err)
      if (err.message==='Network Error') this.setState({ error: true, errormsg: err.message })
      else if (err.response && err.response.status === 404) this.setState({errormsg: 'Wrong case ID/ email entered!'})
      else this.setState({errormsg: `Some error occured or can't reach server` })
    })
  }

  showError() {
    if (this.state.errormsg)
      return (<div className='alert alert-danger'><b>{this.state.errormsg}</b></div>)
  }

  renderOrgList() {
    if (this.props.orgs){
      return (this.props.orgs).map((key, i)=>{
        return (<option className="w3-input w3-border" value={key.orgId} key={i}> {key.orgName} </option>)
      })
    }
  }

  render() {
    return (
      <div className='container'>
        <form className="mb-3" id="form2" onSubmit={this.handleSubmit}>

        <h4 className='mb-4'>Enter relevant details</h4>

        <div className="form-group">
          <label>Organization:</label>
          <select className="custom-select" name="orgId" required 
            onChange={this.handleChange} >
              {this.renderOrgList()}
          </select>
        </div>

        <div className="form-group">
          <label>Organization Name:</label>
          <input className="form-control" placeholder="Enter Organization Name" name="name" type="text" required 
           onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Place:</label>
          <input className="form-control" placeholder="Enter place name" name="place" type="text" required 
           onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input className="form-control" placeholder="Enter address" name="address" type="text" required 
           onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>PIN Code:</label>
          <input className="form-control" placeholder="Enter PIN code" name="pin" type="number" required 
           onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input className="form-control" placeholder="Enter description" name="description" type="text" required 
           onChange={this.handleChange} />
        </div>

        <h4 className='mb-4 mt-4'>Upload Media files</h4>

        <Upload updateAddresses = {
          (picsArray, audiosArray, videosArray)=>{
            this.setState({
              picsArray: picsArray,
              audiosArray: audiosArray,
              videosArray: videosArray
            })
          }
        }/>

        <button type="submit" className="btn btn-primary my-4">Final Submit</button>
        </form>

      </div>
    )
  }
}

class ReportSuccess extends Component {

  state = {errmessage: null}

  generateReport = () =>{
    console.log('clicked')
    axios.post('/status', {
      caseId: this.props.caseId, email: this.props.email
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
      <div className="container">
        <div className='jumbotron bg-white'></div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-success text-center">
              <p>Your report has been registered successfully</p>
              <p>Please note the below Case ID associated with your case for future reference</p>
              <h3 className='text-center'>Case ID: {this.props.caseId}</h3>
              <h3 className='text-center'>Email: {this.props.email}</h3>
            </div>
            <div className='alert alert-dark text-center'>
              Click below button to generate a receipt for your report.
              You can request for this receipt anytime by going to check status option
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button className='btn btn-dark' onClick={this.generateReport}>Generate</button>
            </div>
            {this.showError()}
          </div>
        </div>
      </div>
    )
  }
}

export default class Report extends Component{

  state = {
    loaded: false,
    userRegistered: false,
    orgs: null,
    reportSuccess: false, userEmail: undefined, caseId: undefined
  }

  componentDidMount() {
    axios.get('/getorganizations')
    .then(response=>{
      if (response.status===200) this.setState({orgs: response.data.data})
    })
  }

  render() {
    if (this.state.reportSuccess) {
      return <ReportSuccess caseId={this.state.caseId} email={this.state.email} />
    }
    return (
      <div>
        <Nav />
        <Header />
        {(!this.state.userRegistered) ?
          <NewUser setUserRegistered={()=>this.setState({userRegistered: true})} /> :
          <ReportForm orgs={this.state.orgs}
            setReportSuccess = { (caseId, email)=> (
              this.setState({
                caseId: caseId,
                email: email,
                reportSuccess: true
              })
            )}
          />
        }
      </div>
    )
  }
}