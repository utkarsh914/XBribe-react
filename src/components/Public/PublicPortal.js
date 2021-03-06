import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/axiosInstance'
import Pagination from "react-js-pagination";
import './Styles.css';
import Loader from "../Common/Loader";
import Header from '../Common/Header';
import Footer from '../Common/Footer';
// import $ from 'jquery';

// function to render all posts
const Post = (props) => (
  <div className={props.case.status==='resolved' ? 'alert alert-success mb-2' : 'alert alert-dark mb-2'}>
    <h5>Ministry: {props.ministries[props.case.ministryId]}</h5>
    <p className="mb-0">{props.case.place}, {props.case.date}</p>
  </div>
)

class Paginate extends Component {

  constructor(){
    super()
    this.state = {
      loaded: false,
      data: {},
      filter: {}
    }
    this.fetchData(this.state.filter)
  }
  

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.fetchData(this.state.filter)
  }

  fetchData(param) {
    axios.get('/public', { params: param })
    .then(response=>{
      this.setState({ data: response.data, filter: response.data.filter, loaded: true })
    })
    .catch(err=>{
      console.log(err)
    })
  }
 
  handlePageChange(pageNumber) {
    this.setState({loaded: false}, ()=>{
      let filter = this.state.filter
      filter.pageNo = pageNumber
      this.fetchData(filter)
    })
  }
 
  render() {
    if (!this.state.loaded) return <Loader/>
    return (
      <div className='w3-animate-opacity'>
        < Header />
        < Nav />
        < FilterModal
          ministries={ this.state.data.ministries }
          error={ this.state.data.error }
          sendData={ (data) => {
            this.setState({ data: data, filter: data.filter })
          } }
        />
        < Container data={this.state.data} />
        <div className="pagination justify-content-center mt-5">
          <Pagination
            activePage={parseInt(this.state.filter.pageNo) || 1}
            itemsCountPerPage={parseInt(this.state.filter.size) || 10}
            totalItemsCount={parseInt(this.state.filter.totalCount) || 1}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
            itemClass={"page-item"}
            linkClass={"page-link"}
          />
        </div>
        < Footer />
      </div>
    );
  }
}

class FilterModal extends Component {

  constructor(props) {
    super(props);
    this.state = { ministryId: '', from: '', to: '', status: '', orderBy: '', size: '', pageNo: '1' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.get('/public', { params: this.state })
    .then(response=>{
      if (response.data.filter.ministryId === '') this.setState({ministryId: ''});
      this.props.sendData(response.data);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  renderMinistryList() {
    if (this.props.ministries && !this.props.error){
      return Object.keys(this.props.ministries).map((key, i)=>{
        return (<option className="w3-input w3-border" value={key} key={i}> {this.props.ministries[key]} </option>)
      })
    }
  }

  render() {
    return(
      <div className="modal fade" id="filterModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
          
            <div className="modal-header">
              <h4 className="modal-title">Select filters</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            
            <div className="modal-body">
              <form id="filterForm" method="get" onSubmit={this.handleSubmit}>
    
                <div className="form-group">
                  <label><b>Ministry</b></label>
                  <select name="ministryId" className="custom-select" value={this.state.ministryId} onChange={this.handleChange}>
                    <option value="any">Any Ministry</option>
                    {this.renderMinistryList()}
                  </select>
                </div>
    
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label><b>Date (From):</b></label>
                      <input className="form-control" name="from" type="date" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label><b>Date (To):</b></label>
                      <input className="form-control" name="to" type="date" onChange={this.handleChange} />
                    </div>
                  </div>
                </div>
    
                <div className="form-group">
                  <label><b>Case Status</b></label>
                  <select name="status" className="custom-select" onChange={this.handleChange} >
                    <option value="any">Any</option>
                    <option value="submitted">Received</option>
                    <option value="accepted">Accepted</option>
                    <option value="archived">Archived</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
    
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label><b>Order By</b></label>
                      <select name="orderBy" className="custom-select" onChange={this.handleChange} >
                        <option value="new">Newest first</option>
                        <option value="old">Oldest first</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label><b>Posts per page</b></label>
                      <select name="size" className="custom-select" onChange={this.handleChange} >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block" data-toggle="modal" data-target="#filterModal">Apply Filter</button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

class Nav extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return(
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top card no-round">
        <div className="container">
        <Link className="navbar-brand" to="/">PUBLIC HOME</Link>
        <button className="navbar-toggler justify-content-end" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/ministry">Ministry Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin Login</Link>
            </li>
            <li className="nav-item">
              <div className="nav-link modal-toggle" data-toggle="modal" data-target="#filterModal">Filter Posts</div>
            </li>
          </ul>
        </div>	
        </div>
      </nav>
    )
  }
}

class Container extends Component {

  showReports() {
    if (this.props.data.posts){
      return (this.props.data.posts.map((currentPost, i)=>{
        return <Post case={currentPost} ministries={this.props.data.ministries}  key={i} />
      }))
    }
  }

  loadReports() {
    // if prop passed is empty
    if (this.props.data.error===undefined) {
      return (<div className="alert alert-danger mb-2"><strong>{'Error communicating with server!'}</strong></div>)
    }
    else if (this.props.data.error) {
      return (<div className="alert alert-danger mb-2"><strong>{this.props.data.message}</strong></div>)
    }
    else {
      return (
        <div id="posts">
          <div className="alert alert-success alert-dismissible fade show mb-2">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            {this.props.data.message}
          </div>
          {this.showReports()}
        </div>
      )
    }
  }

  render() {
    return(
      <div className="container">
        <div className="row">

          <div className="col-md-4 mt-4">
            <div className="card mb-4">
              <div className="card-body">
                <img src="/images/bprd_logo.png" alt='img' style={{width: '100%'}} />
                <div className="container mt-2">
                  <h3 className="text-center">About BPRD</h3>
                  <p>The Bureau of Police Research and Development (BPR&D), was set up on 28 August 1970 in furtherance of the objective of the Government of India for the modernisation of police forces. It has evolved as a multifaceted, consultancy Ministry. At present it has 4 divisions – Research, Development, Training and Correctional Administration.</p>
                </div>
              </div>
            </div>

            <div className="card mb-2">
              <div className="card-body">
                <h3 className="text-center">Popular Reports</h3>
              </div>
            </div>
              <div className="alert alert-secondary mb-0">
                <h5>Ministry of Family Welfare</h5>
                <p className="mb-0"><b>Bengaluru,</b> Thu Apr 09 2020 16:05:10</p>
              </div>
              <div className="alert alert-secondary mb-0">
                <h5>Ministry of Family Welfare</h5>
                <p className="mb-0"><b>Bengaluru,</b> Thu Apr 09 2020 16:05:10</p>
              </div>
          </div>

          <div className="col-md-8 mt-4">
            <div className="card mb-3">
              <div className="card-body">
                <h3 className="text-center">Newly reported cases</h3>
              </div>
            </div>
            {this.loadReports()}
          </div>

        </div>
        {/* pagination */}
      </div>
    )
  }
}

export default class PublicPortal extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  setLoaded(value) {
    console.log('fn from prop, ', value)
    if (value===true) this.setState({ loaded: true }, ()=>console.log('loaded set to true'))
    else this.setState({ loaded: false },  ()=>console.log('loaded set to false'))
  }

  render() {
      return(
        <div>
          {/* < Header />
          < Nav /> */}
          < Paginate />
          {/* < Footer /> */}
        </div>
      )
  }
}