
const moment = require('moment');

const hbs = require('hbs');
const path =require('path')
//注册partials目录
hbs.registerPartials(path.join(__dirname,'../views/partials'))

//注册帮助方法
hbs.registerHelper('addOne',function (num) {
    return ++num;
});

hbs.registerHelper('date',function (date, format) {
    const m = moment(date);
    if(m){
        return m.format(format);
    }
    else{
        return '';
    }
});

//代码块的缓存对象
const blocks = {};
//注册扩展代码块helper
hbs.registerHelper('extend',function (name, context) {
   //context是上下文，保存有用的方法和数据，是hbs传入的参数，肯定在最后
    let block = blocks[name];//block用来存放代码块
    if(!block){
        block=blocks[name]= [];
    }
    //this是需要转移的HTML代码，为保障安全性使用context.fn方法进行处理
    //编译指令中代码块并放入block
    block.push(context.fn(this));
});

hbs.registerHelper('block',function (name) {
    //对HTML代码进行格式化
    const val = (blocks[name] || []).join('\n');
    //清空缓存
    blocks[name] = [];
    return val;
})