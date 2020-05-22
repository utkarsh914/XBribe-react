import React, { Component } from 'react';

class Loader extends Component {
  render() {
    const height = this.props.height || '100vh'
    return(
      <div className="d-flex justify-content-center align-items-center bg-dar w3-animate-opacity" style={{height: height, background: 'rgba(0,0,0,0.2)'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Loader