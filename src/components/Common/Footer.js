import React, { Component } from 'react';

export default class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return(
      <footer className="jumbotron bg-dark text-light text-center mt-5 mb-0">
	      <h4>&copy; BPRD | 2020</h4>
      </footer>
    )
  }
}
