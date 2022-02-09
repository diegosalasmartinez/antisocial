import React, { Component } from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header {...this.props}/>
        <Outlet/>
      </>
    )
  }
}
