import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return(
      <div className="d-flex justify-content-center align-items-center bg-dar" style={{height: '100vh'}}>
        <div className="spinner-border text-ligh" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Loader