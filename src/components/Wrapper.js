import React, { Component } from 'react'

export default class Wrapper extends Component {
  render() {
    const { loading } = this.props;
    
    return (
      <>
        { loading ?
          <div>Loading</div>
          :
          <>{this.props.children}</>
        }
      </>
    )
  }
}
