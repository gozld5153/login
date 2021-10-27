const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
   console.log(req.body)
   const userInfo = req.body.userInfo;
   const data = await User.findOne({ 
      where: {userId: userInfo.userId, password: userInfo.password}
   })
   
   
   if(!data){
      res.status(400).send("정보가 일치하지 않습니다.")
   }
   else {
      delete data.dataValues.password
      const accessToken = jwt.sign(data.dataValues, process.env.SECRET_KEY, {expiresIn: '5m'})
      res.cookie('token', accessToken)

      res.status(200).send("ok")
   }
}