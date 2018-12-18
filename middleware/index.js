exports.initLocals = function (req,res,next) {
    // 将VIP菜单数据存放至res.locals
    res.locals.courses= [
        {url: '/vip-course/web', icon:'https://img.kaikeba.com/web_menu.png'
            ,name:'Web全栈架构师'
            ,description:'授课深度对标百度T6-T7，进入BAT等一线大厂，成为行业领域的稀缺人才'
            ,poster:'https://img.kaikeba.com/web_vip.png'
        },
        {url: '/vip-course/python', icon:'https://img.kaikeba.com/python_menu.png'
            ,name:'Python爬虫商业项目班'
            ,description:'廖雪峰亲自传授如何用python，让天下没有爬不到的数据'
            ,poster:'https://img.kaikeba.com/python_vip_new.png'
        }
    ];
    next();
}