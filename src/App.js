import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Layout = React.lazy(() => import('./layout/Layout'))
const Content = React.lazy(() => import('./layout/Content'))
const A = React.lazy(() => import('./layout/A'))
const B = React.lazy(() => import('./layout/B'))

const loading = <div>Loading</div>

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path='/' element={<Layout {...this.props}/>}>
              <Route path='home' element={<Content {...this.props} element={A}/>}/>
              <Route path='posts' element={<Content {...this.props} element={B}/>}/>
              <Route path='*' element={<div>Not found</div>}/>
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}
