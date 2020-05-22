import React, { Component } from 'react';

export default class Header extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return(
      <div className="jumbotron text-center mb-0" id="header">
	      <h1>Bureau of Police Research and Development</h1>
      </div>
    )
  }
}