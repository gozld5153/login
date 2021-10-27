import React, { useState } from 'react'
import Login from "./component/Login" 
import Signin from "./component/Signin"
import Mypage from './component/Mypage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  const handleLogin = () => {
    setIsLogin(true)
  }
  const handleLogout = () => {
    setIsLogin(false)
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {isLogin ? <Mypage handleLogout={handleLogout} /> : <Login handleLogin={handleLogin} />}
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
