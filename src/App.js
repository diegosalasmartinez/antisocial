import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import loading from './theme/loading'

const Layout = React.lazy(() => import('./layout/Layout'))
const Content = React.lazy(() => import('./layout/Content'))
const A = React.lazy(() => import('./pages/A'))
const B = React.lazy(() => import('./pages/B'))

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path='/' element={<Layout {...this.props}/>}>
              <Route path='' element={<Content {...this.props} element={A}/>}/>
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
