const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
   if(!req.headers.cookie){
      res.status(400).end()
   }
   else {
      const start = req.headers.cookie.indexOf('=')
      const token = req.headers.cookie.slice(start + 1)
      jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
         if(err) throw err;
         else {
            console.log(result)
            res.status(200).send({myInfo: result})
         }
      })
   }
}