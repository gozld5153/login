const { User } = require('../models');

module.exports = async (req, res) => {
   const userInfo = req.body.userInfo
   const hasId = await User.findOne({
      where:{userId: userInfo.userId}
   })

   if(hasId){
      res.status(200).send('이미 사용중인 아이디입니다.')
   }
   else {
      res.status(200).send('사용 가능한 아이디입니다.')
   }
}