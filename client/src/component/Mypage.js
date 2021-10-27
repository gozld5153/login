import React, {useState} from 'react'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';

const Mypage = ({ handleLogout }) => {
   const [isRes, setIsRes] = useState(false)
   const [myId, setMyId] = useState("")
   const [myEmail, setMyEmail] = useState("")
   const [createdAt, setCreatedAt] = useState("")

   const handleMyInfo = () => {
      setIsRes(true)
      axios("http://localhost:4000/myinfo",{
         withCredentials: true
      })
      .then((data) => {
         setMyId(data.data.myInfo.userId)
         setMyEmail(data.data.myInfo.email)
         setCreatedAt(data.data.myInfo.createdAt)
      })
   }

   return (
      <div className="middleContainer">
         <div className="infoContainer">
            <div className="myInfoBox">
               <button className="myInfoBtn" onClick={handleMyInfo}>나의 정보</button>
            </div>
            <div className={!isRes ? "remove" : "move"}>
               <AccountBoxIcon sx={{fontSize: 50}} color="primary" />
               <p>{myId}</p>
            </div>
            <div className={!isRes ? "remove" : "move"}>
               <AlternateEmailIcon sx={{fontSize: 50}} color="primary" />
               <p>{myEmail}</p>
            </div>
            <div className={!isRes ? "remove" : "move"}>
               <CalendarTodayIcon sx={{fontSize: 50}} color="primary" />
               <p>{createdAt}</p>
            </div>

            <div className="logoutBtnBox">
               <button className="logoutBtn" onClick={handleLogout}>로그아웃</button>
            </div>
         </div>
      </div>
   )
}

export default Mypage
