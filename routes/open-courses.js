var express = require('express');
var router = express.Router();
const {query} = require("../model/db");
const {OpenCourse} = require('../model');
// const db = require('../model/db');
/* GET home page. */
// router.get('/',async (req, res, next)=> {
//     let sql = `select * from kkb.user where username=?`;
//
//     // db.sequelize.query(sql,'kkk').then((results)=>{
//     //     console.log(results.length);
//     // });
//
//     let users = await query(sql,['kkk']);
//     console.log(users[0].phone);
//     // next(users);
//     res.render('open-courses')
// });

router.get('/', async (req, res, next) => {

    //查询公开课数据
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 1;
        const offset = (page - 1) * size;//计算偏移量

        const sql = 'SELECT * FROM kkb.OPEN_COURSE ORDER BY TIME DESC LIMIT ?,?';
        const results = await query(sql, [offset, size]);

        for (const result of results) {
            const now = new Date();
            const endTime = new Date(result.time);

            if (now - endTime) {
                result.notBegin = false;
            } else {
                result.notBegin = true;
            }
        }

        //获取分页数据
        //1.获取数据总条数
        const count = await query('select count(*) as count from kkb.open_course')
            .then(results => {
                return results[0].count
            });
        console.log('总条数：' + count);

        // const results = await OpenCourse.findAndCountAll({

        // })
        //总页数
        const total = Math.ceil(count / size);
        //首页是否可点击
        const first = page != 1;
        //最后一页是否可点击
        const last = page != total;
        //是否显示上一页
        const prev = page > 1;
        //是否显示下一页
        const next = page < total;



        res.render('open-courses', {
            title: '公开课',
            openCourses: results,
            pagination:getPagination(count,page,size)
        })
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/bySequelize',async (req,res,next)=>{
   try {
       const page = +req.query.page||1;
       const size = +req.query.size||1;
       const results = await OpenCourse.findAndCountAll({
           offset:(page - 1)*size,
           limit:size,
           order:[['time','desc']]//可能有多个排序条件，所以是二维数组
       });
console.log(results.rows);
       res.render('open-courses',{
           title:'公开课',
           openCourses:results.rows,
           pagination:getPagination(results.count,page,size)
       });

   }catch (e) {
       next(e);
   }

});

function getPagination(count,page,size){
    const total = Math.ceil(count/size);
    const first = page != 1;
    const last = page != total;
    const prev = page > 1;
    const next = page <total;
    return {page,total,first,last,prev,next};
}

module.exports = router;
