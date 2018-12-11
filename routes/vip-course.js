var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('vip-course', { title: 'vip course' });
});

//根据course名称动态路由
router.get('/:course',(req,res,next)=>{
    const title = getTitle(res, req.params.course);
    //传参方式1：url传参，req.params.course获取参数，:course为占位符
    console.log(title);
    if(title){
    res.render('vip-course/'+req.params.course,{
       title,
        arr:[{name:'tom',city:{name:'北京'},hobby:['篮球','编程']},
            {name:'jerry',city:{name:'北京'},hobby:['篮球','编程']}],
        birthday:new Date()
    });
    }else{
        //如果要进入错误流程，传递一个Error对象实例
        next(new Error('没有您要查找的课程'));
    }
});

function getTitle(res,course){
    for (const c of res.locals.courses) {
        if(c.url.indexOf(course) !== -1){
            console.log(course);
            return c.name;
        }
    }
    return '';
    // res.locals.courses
}

module.exports = router;
