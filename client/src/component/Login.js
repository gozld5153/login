import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = ({ handleLogin }) => {
   const [userId, setUserId] = useState("")
   const [password, setPassword] = useState("")
   const [isFalse, setIsFalse] = useState(false)
  
   const handleId = (e) => setUserId(e.target.value)
   const handlePW = (e) => setPassword(e.target.value)

   function handlePostLogin() {
      if(!userId || !password) return;
     
      axios.post("http://localhost:4000/login", {
         userInfo: {
            userId,
            password
         }
      }
      ,{
         withCredentials: true,
         headers: {contentType: 'application/json'}
      })
      .then(() => {
         setIsFalse(false)
         handleLogin()
      })
      .catch(() => setIsFalse(true))
   }

   return (
      <div className="inputBox">
         <div className="inputBox2">
            <div className="userId">
               <input type="text" placeholder="아이디를 입력해주세요."  onChange={handleId}/>
            </div>
            <div className="password">
               <input type="password" placeholder="비밀번호를 입력해주세요." onChange={handlePW}/>
            </div>
            <div className="buttonBox">
               <div className="Login">
                  <button onClick={handlePostLogin}>Login</button>
               </div>
               <div className="signin">
                  <Link to="/Signin">
                     <button>Sign in</button>
                  </Link>
               </div>
            </div>
            {isFalse ? <div className="login_err_msg">정보가 일치하지 않습니다.</div> : null}
         </div>
      </div>
   )
}

export default Login
