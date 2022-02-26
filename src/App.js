import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import loading from './theme/loading'

const Layout = React.lazy(() => import('./layout/Layout'))
const Content = React.lazy(() => import('./layout/Content'))
const Page = React.lazy(() => import('./layout/Page'))

const Login = React.lazy(() => import('./pages/login/Login'))
const Register = React.lazy(() => import('./pages/login/Register'))
const Posts = React.lazy(() => import('./pages/posts/Posts'))
const Profile = React.lazy(() => import('./pages/profile/Profile'))
const A = React.lazy(() => import('./pages/A'))
const B = React.lazy(() => import('./pages/B'))

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path='/sign-in' element={<Page {...this.props} element={Login}/>}/>
            <Route path='/sign-up' element={<Page {...this.props} element={Register}/>}/>
            <Route path='/' element={<Layout {...this.props}/>}>
              <Route path='' element={<Content {...this.props} element={Posts}/>}/>
              <Route path=':username' element={<Content {...this.props} element={Profile}/>}/>
              <Route path='saved' element={<Content {...this.props} element={B}/>}/>
              <Route path='*' element={<div>Not found</div>}/>
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}
