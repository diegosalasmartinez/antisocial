import React, { Component } from 'react'

export default class Wrapper extends Component {
  render() {
    const { pageLoading } = this.props;
    
    return (
      <>
        { pageLoading ?
          <div>Loading</div>
          :
          <>{this.props.children}</>
        }
      </>
    )
  }
}
