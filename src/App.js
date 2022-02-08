import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Layout = React.lazy(() => import('./layout/Layout'))

const loading = <div>Loading</div>

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="Home" element={<Layout {...this.props}/>}/>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
