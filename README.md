# kaikeba
kaikeba studying project
# From The Top

1. 安装express

   ```cql
   npm i -g express express-generator
   ```

   -g表示全局安装

2. 通过Express模板创建项目：指定视图模板为handlebars

   ```CQL
   express kaikeba --hbs
   ```

   创建成功后，自动安装默认引用（Windows命令行或者开发环境的终端--WebStorm）：

   ```cql
   npm i/install
   ```

3. 保证脚本修改后可以自动重启服务器，安装node-dev（-s表示为全局依赖，需要在package.json中说明）

   ```cql
   npm i node-dev -g
   ```

   修改package.json中的start值从

   > node ./bin/www

   到

   > node-dev ./bin/www

4. 如果需要修改程序运行端口可以到bin/www中进行指定

5. npm start 运行项目，查看项目运行是否正常。

6. 修改注册点为淘宝镜像

   npm config set registry https://registry.npm.taobao.org/

7. 想要直接打开引用的第三方脚本，按住ctrl键，点击脚本即可。

8. handlebars是弱逻辑的，在{{}}中只能写变量，不能有表达式。

9. {{{}}}中放的是HTML代码

10. 传参方式：

    > 1. 通过res.render('',ctx);
    > 2. 通过res.locals.xx 的方式
    > 3. 前者的优先级高于后者，即如果同时在而这种穿了同一个参数，会按照前者的值保留。

11. 中间件：对req、res对象进行预处理的函数

```
//middleware/index.js
exports.initLocals = function(req,res,next){
    //...
    next();//必须执行，否则无法继续后面的响应
}
```
```
//app.js
const {initLocals} = require('./middleware');

//注册自定义中间件
//app.use('/users',initLocals)此种写法指定了页面，只有指定的页面才会接收到中间件处理后的数据
//如果需要全局访问，就按照下面的方式书写
app.use(initLocals);
```

12. {{#each courses}}{{/each}}
13. 路由传参数的方式：

```
> 1. url参数：要有**占位符**
>
>    ```javascript
>    router.get('/:course',(req,res)=>{
>        //:course称为占位符，通过req.params.course即可获取到传入的参数
>    });
>    ```
>
> 2. 查询参：体现形式为http://...?a=b
>
>    ```javascript
>    router.get('/',(req,res)=>{
>       //req.query.a即可获取参数值 
>    });
>    ```
>
> 3. 请求体：req.body.xxx，为post用
>
>    ```javascript
>    router.post('/',(req,res)=>{
>       //req.body.xxx 
>    });
>    ```
```

14. 错误处理

   ```javascript
   //vip-course.js
   router.get('',(req,res,next)=>{
       ....
       //错误处理
       next(new Error(''));//默认状态码是500
       next(createError(404,''));//根据明确传递的状态码和错误消息进行显示，require('http-errors')
       
       res.redirect('/vip-course/web');//或者使用重定向处理，地址明确指定/vip-course，否则无法正确定位
   });
   ```

15. handlebars语法1

   > 插值绑定 {{prop}}
   >
   > 注释 {{!content}}用户不可见
   >
   > {{htmlStr}}将传入的值直接输出，即使传入的是html代码
   >
   > {{{htmlStr}}}会把HTML代码进行解析后进行渲染
   >
   > 条件语句{{#if condition}}{{/if}} condition必须是bool值或者可以转换为bool值的值，不能是表达式
   >
   > ​	可以结合{{else if}}注意：没有#
   >
   > ​	{{#unless false}}{{/unless}}与if相反，要求值为false才执行
   >
   > 循环语句 {{#each arr}}{{/each}} 
   >
   > ​	循环嵌套：{{#each arr}}

   > ​				{{#each arrx}} arrx是arr单行的某项数组 {{/each}}
   >
   > ​		          {{/each}}
   >
   > ​	使用@index表示下标，@key表示键
   >
   > ​	如果arr是空数组或者为空时，可以用下面的代码提示用户
   >
   > ​	{{else }}{{/each}}

16. 帮助方法：hbs是单一实例的，运行时只有一个hbs实例，创建helper时需要引入该实例

   > 1. 行内helper：最终输出只是字符串的helper
   >
   >    ```javascript
   >    //注册helper
   >    const hbs = require('hbs');
   >    hbs.registerHelper('addOne',function(num){
   >        return ++num;
   >    });
   >    ```
   >
   >    ```handlebars
   >    {{addOne @index}}
   >    {{!上下文是循环语句，所以才有@index获取角标，如果是键值对可以通过@key获取关键字}}
   >    ```
   >
   >    此处引入moment模块(运行时)
   >
   >    npm i moment -s
   >
   >    ```javascript
   >    const moment = require('moment');
   >    hbs.registerHelper('date',function(date,format){
   >        const m = moment(m);
   >        if(m){
   >            return m.format(format);
   >        }
   >        else{
   >            return '';
   >        }
   >    });
   >    ```
   >
   >    ```handlebars
   >    <p>生日：{{date birthday 'YYYY-MM-DD HH:mm:ss'}}</p>
   >    {{!此处的birthday是通过控制器脚本传入的参数}}
   >    ```
   >
   >    在根目录下创建新的helpers目录，并创建index.js脚本，把上面编写的编写的helper相关代码转移到其中后。在app.js中引入该helpers/index.js脚本。
   >
   > 2. 块级helper：最终输出是html的helper
   >
   >    范例：扩展代码extend
   >
   >    在layout.hbs文件中引用了jquery，但是执行jquery操作的代码在web.hbs中，但是web.hbs中直接执行会报错，找不到$。需要将web.hbs中的代码转移到layout.hbs中引入jquery脚本的下面执行
   >
   >    ```javascript
   >    //helpers/index.js
   >    //name即代码块的名称
   >    //context即上下文，保存有用的方法和数据，是hbs传入的参数，肯定在最后
   >    let blocks = {};//是一个对象
   >    hbs.registerHelper('extend',function(name,context){
   >        const block = blocks[name];
   >        if(!block){
   >            block = blocks[name] = [];
   >        }
   >        //this是需要转移的HTML代码，为保障安全性使用context.fn方法进行处理
   >        //编译指令中代码块并放入block
   >        block.push(context.fn(this));
   >    });
   >    
   >    hbs.registerHelper('block',function(name){
   >       const val = (blocks[name]||[]) .join('\n');
   >        blocks[name]=[];//清空缓存
   >        return val;
   >    });
   >    ```
   >
   >
   >
   >    ```handlebars
   >    {{!layout.hbs，npm i jquery后，复制该目录到public下面}}
   >    <script src="jquery/dist/jquery">
   >    {{{block 'jquery'}}}
   >    ```
   >
   >    ```handlebars
   >    {{!web.hbs}}
   >    {{#extend 'jquery'}}
   >    $(function(){
   >    	alert('yes');
   >    });
   >    {{/extend}}
   >    ```
   >
   >    其他handlebars帮助方法[^1]：

17. 部分视图 - partial（每次编写新的partial，需要重启）

   ```javascript
   //helpers/index.js
   const path = require('path');
   const hbs = require('hbs');
   hbs.registerPartials(path.join(__dirname,'../views/partials'));
   ```

   在views下面创建目录partials，在其中创建文件nav.hbs

   ```handlebars
   {{!nav.hbs,将layout.hbs中的导航栏代码转移到此}}
   ```

   ```handlebars
   {{> nav}}
   {{> 'nav'}}
   {{!上述二者都可以}}
   ```

   动态partial - whichPartial其实就是一个helper，可以动态的决定要渲染的partial

   ```handlebars
   {{!layout.hbs}}
   {{!在middleware/index.js中定义const isLogin = true; res.locals.navName = isLogin?'nav':'nav-unauth'}}
   {{> (whichPartial navName)}}
   ```

   ```javascript
   //helpers/index.js
   hbs.registerHelper('whichPartials',function(name,context){
      return name; 
   });
   ```

18. 块级partial

   ```handlebars
   {{#> ooxx}}出现错误时，能够看到这句话{{/ooxx}}
   {{!默认没有ooxx的partial，所以肯定会报错，现实上面的内容}}
   ```

   ***@partial-block？***partial传参

   布局组件：

   在views/partials下面新建layout.hbs

   ```handlebars
   {{!views/layout.hbs}}
   <div class='top'>
   	{{> top}}
   </div>
   <div class='content'>
   	<div class='left'>
   	{{> left}}
   	</div>
   	<div class='right'>
   	{{> right}}
   	</div>
   </div>
   ```



   ```handlebars
   {{!views/layout.hbs，使用布局组件}}
   {{#> layout}}
   	{{#*inline 'top'}}
   	this is top
   	{{/inline}}
   	{{#*inline 'left'}}
   	this is left
   	{{/inline}}
   	{{#*inline 'right'}}
   	this is right
   	{{/inline}}
   {{/layout}}
   ```

    

19. 



































































[^1]: https://github.com/helpers/handlebars-helpers 



