import React, {useRef, useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

const Signin = () => {
   const userId = useRef() 
   const userPW = useRef()
   const pwCheck = useRef()
   const history = useHistory()
   const [checkMsg, setCheckMsg] = useState("")
   const [signId, setSignId] = useState("")
   const [signPW, setSignPW] = useState("")
   const [signEmail, setSignEmail] = useState("")
   const [checkPW, setCheckPW] = useState(true)
   const [errMsg, setErrMsg] = useState("")
   const [idCheck, setIdCheck] = useState(false)
   

   function checkId() {
      if(!signId){
         return 
      }else {
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
            setIdCheck(true)
         })
      }
   }

   //귀찮다 유효성 검사
   const handleSignId = (e) => {
      setIdCheck(false)
      if(/^[A-Za-z0-9]{4,10}$/.test(e.target.value)){
         setSignId(e.target.value)
         setErrMsg("")
      }
      else setSignId(null)
   }

   const handleSignPW = (e) => {
      if(/.{4,16}/.test(e.target.value)){
         setSignPW(e.target.value)
         setErrMsg("")
      }
      else setSignPW(null)
   }

   const handleSignCPW = (e) => {
      if(e.target.value !== userPW.current.value){
         setCheckPW(false)
         setErrMsg("")
      }
      else setCheckPW(true)
   }

   const handleSignMail = (e) => {
      if(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(e.target.value)){
         setSignEmail(e.target.value)
         setErrMsg("")
      }
      else setSignEmail(null)
   }

   const signIn = () => {
      if(!signId) setErrMsg("아이디를 입력해 주세요.")
      else if(!idCheck) setErrMsg("아이디 중복확인을 해주세요.")
      else if(!signPW) setErrMsg("비밀번호를 입력해 주세요")
      else if(userPW.current.value !== pwCheck.current.value) setErrMsg("비밀번호를 확인해 주세요.")
      else if(!signEmail) setErrMsg("이메일을 입력해 주세요.")
      else {
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
   }

   return (
      <div className="signBox">
         <div className="container">
            <div className="inputContainer">
               <div className="pushId box">
                  <input type="text" ref={userId} onChange={handleSignId} name="userId" placeholder="아이디" />
                  <button onClick={checkId}>중복 확인</button>
               </div>
                  {!idCheck ? null : <p>{checkMsg}</p>}
               <p>{signId === null ? "아이디는 4~10길이의 영어, 숫자로 이루어져야 합니다." : null}</p>

               <div className="pushPW box" >
                     <input type="password" ref={userPW} onChange={handleSignPW} placeholder="비밀번호"/>
               </div>
               <p>{signPW === null ? "비밀번호는 4자 이상입니다.": null}</p>

               <div className="checkPW box" >
                     <input type="password" ref={pwCheck} onChange={handleSignCPW} placeholder="비밀번호 확인"/>
               </div>
               <p>{checkPW ? null : "비밀번호가 일치하지 않습니다."}</p>

               <div className="pushEmail box" >
                     <input type="text" name="email" onChange={handleSignMail} placeholder="email"/>
               </div>
               <p>{signEmail === null ? "올바른 주소가 아닙니다." : null}</p>
            </div>
            <div>
               
            </div>
         </div>
         <div className="signBtn">
            <button onClick={signIn}>가입신청</button>
         </div>
         <div className="err">{errMsg === "" ? null : errMsg}</div>
      </div>
   )
}

export default Signin
