const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config()

const controllers = require("./controllers")
app.use(express.json());

app.use(cors({
   origin: true,
   methods: ["GET", "POST", "OPTIONS"],
   credentials: true,
}))

//추후에 get요청으로 바꾸자
app.post("/checkid", controllers.checkID)
app.post("/signin", controllers.signIn)
app.post("/login", controllers.login)
app.get("/myinfo", controllers.myInfo)




app.listen(4000, () => {
   console.log("4000번 포트로 서버가 작동합니다!")
})

