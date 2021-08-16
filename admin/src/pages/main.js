import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login'
import AdminIdex from './adminIndex'

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={AdminIdex} />
    </Router>
  )
}

export default Main