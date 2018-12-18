const Sequelize = require('sequelize');
const sequelize = new Sequelize('kkb', 'root', 'tingjiaN*&768*', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        acquire: 30000,
        idle: 10000
    },
    timestamp: false
});

//定义模型，反向创建进入数据库
const User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
});

User.sync({force: false}).then(() => {
    //插入若干测试数据
    console.log('sequelize run!');
});

const db = {Sequelize,sequelize};
module.exports = db;