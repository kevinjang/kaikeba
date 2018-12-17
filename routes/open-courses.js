

var express = require('express');
var router = express.Router();
const {query} = require("../model/db");
// const db = require('../model/db');
/* GET home page. */
router.get('/',async (req, res, next)=> {
    let sql = `select * from kkb.user where username=?`;

    // db.sequelize.query(sql,'kkk').then((results)=>{
    //     console.log(results.length);
    // });

    let users = await query(sql,['kkk']);
    console.log(users[0].phone);
    // next(users);
    res.render('open-courses')
});

module.exports = router;
