const { User } = require('../models')

module.exports = (req, res) => {
   const userInfo = req.body.userInfo
   if(!userInfo.userId || !userInfo.password || !userInfo.email){
      return res.status(400).end()
   }
   console.log(userInfo)
   User.create({
      userId: userInfo.userId,
      password: userInfo.password,
      email: userInfo.email
   })
   .then((data) => {
      res.status(201).send("가입을 축하합니다.")
   })

}