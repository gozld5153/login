import React, {useRef, useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

const Signin = () => {
   const userId = useRef() 
   const history = useHistory()
   const [checkMsg, setCheckMsg] = useState("")
   const [signId, setSignId] = useState("")
   const [signPW, setSignPW] = useState("")
   const [signEmail, setSignEmail] = useState("")
   

   function checkId() {
      axios.post("http://localhost:4000/checkid", {
         userInfo: {
            userId: userId.current.value
         }
      },{
         headers : {
            contentType: 'application/json',
            accept: 'application/json'
         }
      })
      .then((data) => {
        setCheckMsg(data.data)
      })
   }

   //귀찮다 유효성 검사
   const handleSignId = (e) => {
      setSignId(e.target.value)
   }
   const handleSignPW = (e) => {
      setSignPW(e.target.value)
   }
   const handleSignCPW = (e) => {
      
   }
   const handleSignMail = (e) => {
      setSignEmail(e.target.value)
   }

   const signIn = () => {
      axios.post("http://localhost:4000/signin", {
         userInfo : {
            userId: signId,
            password: signPW,
            email: signEmail
         }
      }, {
         headers: {contentType: 'application/json'}
      })
      .then(() => history.push('/'))
      .catch((err) => console.log(err))
   }

   return (
      <div className="signBox">
         <div className="pushId">
            <input type="text" ref={userId} onChange={handleSignId} name="userId" placeholder="사용할 아이디를 입력하세요" />
            <button onClick={checkId}>중복 확인</button>
            <p className={checkMsg.length === 15 ? "red" : "green"}>{checkMsg}</p>
         </div>
         <div className="pushPW" >
            <input type="text" name="password" onChange={handleSignPW} placeholder="비밀번호"/>
         </div>
         <div className="checkPW" >
            <input type="text" onChange={handleSignCPW} placeholder="비밀번호 확인"/>
         </div>
         <div className="pushEmail" >
            <input type="text" name="email" onChange={handleSignMail} placeholder="email"/>
         </div>
         <div>
            <button onClick={signIn}>가입신청</button>
         </div>
      </div>
   )
}

export default Signin
