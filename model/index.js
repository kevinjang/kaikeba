const Sequelize = require('sequelize');
const sequelize = new Sequelize('kkb', 'kevinjang', 'tingjiaN*&768*', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

//定义模型，反向创建进入数据库
// const User = sequelize.define('user', {
//     firstName: Sequelize.STRING,
//     lastName: Sequelize.STRING
// });
//
// User.sync({force: false}).then(() => {
//     //插入若干测试数据
//     console.log('sequelize run!');
//     // User.create({
//     //     firstName: 'Tom',
//     //     lastName:'Cruise'
//     // })
// }).then(()=>{
//     User.findAll().then(users=>{
//         console.log(users[0]);
//     })
// });

const db = {Sequelize,sequelize};

fs.readdirSync(__dirname).filter(file=>file !== 'index.js' && file !== 'db.js')
    .forEach(file =>{
        const model = sequelize.import(path.join(__dirname,file));
        db[model.name] = model;
    })
module.exports = db;
