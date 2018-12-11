var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res.locals.courses);
  // res.send('respond with a resource');
    res.render('users');
});

router.post('/',(req,res,next)=>{
  //通过请求体req.body获取参数
    console.log(req.body);
    res.send('服务器接收到了传递的数据');
});

module.exports = router;
