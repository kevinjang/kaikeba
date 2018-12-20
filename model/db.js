const mysql = require('mysql');

const cfg = {
    host: 'localhost',
    user: 'kevinjang',
    password: 'tingjiaN*&768*', // 连接池
    database:'kkb'
}

const pool = mysql.createPool(cfg);

module.exports ={
    query:function (sql,value) {
        return new Promise((resolve,reject)=>{
            //查询方式1，通过连接池获取连接进行查询
            // pool.getConnection((err,conn)=>{
            //     if(err) reject(err);
            //     conn.query(sql,value,(err,results)=>{
            //         if(err) reject(err);
            //         else resolve(results);
            //     });
            //
            //     conn.release();
            //
            // });
            // console.log()
            //查询方式2，直接通过连接池进行查询
            //省略了创建连接、最终释放连接的操作
            // pool.query(sql,value,(err,results)=>{
            //     if(err) reject(err);
            //     else resolve(results);
            // });

            pool.query(sql,value,(err,results)=>{
                if(err) reject(err);
                else resolve(results);
            });
        });
    },
    pool
}
