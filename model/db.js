const mysql = require('mysql');

const pool = mysql.createPool({
    host:'localhost',
    user:'kkb_admin',
    password:'pwd'
});

module.exports = {
    query:function (sql, value) {
        return new Promise((resolve,reject)=>{
            // pool.getConnection((err,conn)=>{
            //     conn.query(sql,value,(err,results)=>{
            //         if(err) reject(err);
            //         else resolve(results);
            //     });
            //
            //     conn.release();
            // })

            pool.query(sql,value,(err,results)=>{
                if(err) reject(err);
                else resolve(results);
            })
        });
    }
}