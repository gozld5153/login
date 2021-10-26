import React, { useState } from 'react'
import Login from "./component/Login" 
import Signin from "./component/Signin"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/Signin">
            <Signin />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
