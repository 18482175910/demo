import React from 'react'
import { 
  BrowserRouter as Router,
  Route 
} from 'react-router-dom'
import { Login } from '../container/login/index'
import { Home } from '../container/home/index'
import { App } from '../container/index'

export const RouterMap = () => (
    <Router>
      <App> 
        <Route exact path="/" component={Login}/>
        <Route path="/home" component={Home}/>
      </App>
    </Router>
  )