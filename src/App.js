import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import loading from './theme/loading'

const Layout = React.lazy(() => import('./layout/Layout'))
const Content = React.lazy(() => import('./layout/Content'))
const Page = React.lazy(() => import('./layout/Page'))

const Login = React.lazy(() => import('./pages/login/Login'))
const Register = React.lazy(() => import('./pages/login/Register'))
const Home = React.lazy(() => import('./pages/home/Home'))
const Profile = React.lazy(() => import('./pages/profile/Profile'))
const Categories = React.lazy(() => import('./pages/categories/Categories'))
const Saves = React.lazy(() => import('./pages/saves/Saves'))

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path='/sign-in' element={<Page {...this.props} element={Login}/>}/>
            <Route path='/sign-up' element={<Page {...this.props} element={Register}/>}/>
            <Route path='/' element={<Layout {...this.props}/>}>
              <Route path='' element={<Content {...this.props} element={Home}/>}/>
              <Route path='user/:username' element={<Content {...this.props} element={Profile}/>}/>
              <Route path='saved' element={<Content {...this.props} element={Saves}/>}/>
              <Route path='categories' element={<Content {...this.props} element={Categories}/>}/>
              <Route path='*' element={<Content {...this.props} element={Categories}/>}/>
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}
