

#*koa2学习笔记*

[TOC]
#koa2 环境准备

+ node.js环境 版本v7.6以上, node.js [官网地址](https://nodejs.org)
+ npm 版本3.x以上
+ 编辑器使用vs code

#1. koa2入门demo     
+ 初始化 package.json；
>  新建一文件夹目录koa2_demo1，在该文件夹使用命令:npm init ，然后一路回车生成 一个package.json文件；
``` 
{
  "name": "koa2_demo1",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
}
```
+  添加koa2的包依赖，建议通过依赖包的方式安装koa包
``` 
{
  "name": "koa2_demo1",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa":"2.0.0"
  }
}
```
> 然后执行命令:npm install，至此koa安装完成生成一个node_modules文件目录；

+ 新建app.js,写如下代码:
```javascript
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})
app.listen(3000)
console.log('xiaobai is starting at port 3000')
```
>执行命令: node app.js，亦可配置package.json中的start参数  ,然后执行命令:npm start;结果是一样的

![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198920296015314566601.png)
``` 

 {
  "name": "koa2_demo1",
  "version": "1.0.0",
  "description": "koa study",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "app.js"
  },
  "author": "yangguochao",
  "license": "ISC",
  "dependencies": {
    "koa": "2.0.0"
  }
}
```

#2. Koa2源码核心结构
+ 在第一步的node_modules文件夹中，找到Koa文件夹打开lib目录会发现以下四个文件  
>1.application.js :是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。    
> 2.context.js :处理应用上下文，里面直接封装部分request.js和response.js的方法
> 3.request.js: 处理http请求  
> 4.response.js :处理http响应

#3.koa2 ctx认识
+ ctx是context的缩写；中文一般叫成上下文，这个在所有语言里都有的名词，可以理
解为上(request)下(response)沟通的环境，所以koa中把他们两都封装进了ctx对象，koa官方文档里的解释是为了调用方便body是http协议中的响应体，header是指响应头ctx.body = ctx.res.body = ctx.response.body
+ 将ctx对象作为输出body，认识在请求页面时，ctx对象的结构:
```javascript
const Koa = require('koa')
const app = new Koa()
app.use( async ( ctx ) => {
  ctx.body = ctx
})
app.listen(3000)
console.log('xiaobai is starting at port 3000')
```
+ 执行命令:node app.js

![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198931732765391008808.png)
使用json.cn网页对结果进行序列化，更直观得到如下输出，以后输出结果序列化都使用该站，不再做说明
```
{
    "request":{
        "method":"GET",
        "url":"/",
        "header":{
            "host":"localhost:3000",
            "connection":"keep-alive",
            "upgrade-insecure-requests":"1",
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "accept-encoding":"gzip, deflate, br",
            "accept-language":"zh-CN,zh;q=0.9",
            "cookie":"Hm_lvt_dde6ba2851f3db0ddc415ce0f895822e=1523172283,1523185006,1523186155,1523189670; Hm_lvt_177154e4ab602bf41d8485155b6f13c9=1525830451,1525843569,1525916436,1525936398"
        }
    },
    "response":{
        "status":200,
        "message":"OK",
        "header":{
            "content-type":"application/json; charset=utf-8"
        }
    },
    "app":{
        "subdomainOffset":2,
        "proxy":false,
        "env":"development"
    },
    "originalUrl":"/",
    "req":"<original node req>",
    "res":"<original node res>",
    "socket":"<original node socket>"
}
```
#4. koa2路由处理
+ 一般用户需要请求不同的url返回不同的页面信息，此时需要配置不同路由
+ 原理是根据ctx.request获取用户请求的url，然后返回对应url的信息
```javascript
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  if (ctx.request.url === '/') {
      ctx.response.body = 'index page';
  } else {
      await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.url === '/test') {
      ctx.response.body = 'TEST page';
  } else {
      await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.url === '/error') {
      ctx.response.body = 'ERROR page';
  } else {
      await next();
  }
});
app.listen(3000)
console.log('xiaobai is starting at port 3000')
```
+ 这里是一个基本写法，相对比较繁琐，此时可以利用路由中间件帮助我们实现同样的路由功能
+ 在package.json文件添加依赖对koa-router中间件的依赖包"koa-router": "7.0.0",执行命令:npm install
```javascript
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// add url-route:
router.get('/', async (ctx, next) => {
    let html=
    `
        <ul>
        <li><a href="/hello">/hello</a></li>
        <li><a href="/error">/error</a></li>
        </ul>
    `
    ctx.response.body =html;
});

router.get('/hello', async (ctx) => {
    ctx.response.body = `<h1>Hello</h1>`;
});

router.get('/error', async (ctx, next) => {
    ctx.response.body = `<h1>error</h1>`;
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('xiaobai started at port 3000...');
```
+ 运行结果
![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198959107313779168391.png)
+ 跳转到指定路由
![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198965825425937462132.png)
#5. Koa2 请求数据
##5.1 get请求
 + 在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。

>1.是从上下文中直接获取
请求对象ctx.query，返回如 { a:1, b:2 }
请求字符串 ctx.querystring，返回如 a=1&b=2

>2.是从上下文的request对象中获取
请求对象ctx.request.query，返回如 { a:1, b:2 }
请求字符串 ctx.request.querystring，返回如 a=1&b=2
```javascript
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('xiaobai is starting at port 3000')
})
```
##5.2 post请求数据
+ 用post请求处理URL时，post请求通常会发送一个表单，或者JSON，它作为request的body发送，
然而Node.js提供的原始request对象和koa提供的request对象，都不提供解析request的body的功能！

+ 所以，我们需要引入另一个middleware来解析原始request请求，然后把解析后的参数，绑定到ctx.request.body中;
>将koa-bodyparser添加至依赖."koa-bodyparser": "3.2.0",然后执行命令:npm install

根据package.json中的依赖项下载包；
```javascript
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})
app.listen(3000, () => {
  console.log('xiaobai is starting at port 3000')
})
```
#6 简单登录实例
+ 请深刻理解下面登录实例中设计的基本语法，中间件以及路由跳转的基本用法
```javascript 
const Koa = require('koa')
const app = new Koa()

const router=require('koa-router')()
const bodyParser = require('koa-bodyparser');

router.get('/', async (ctx) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
});

app.use(bodyParser());
router.post('/signin', async (ctx) => {
  var name = ctx.request.body.name || '',password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});

app.use(router.routes());
app.listen(3000,()=>{
  console.log('starting at port 3000');
});
```
+ 执行命令:npde app.js
![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198987559247757394748.png)

+ 密码正确运行结果

![enter image description here](http://www.xiaobaigis.com/net/upload/image/20180515/6366198993134274795493353.png)

#**学习笔记中的源代码可以去github[下载](https://github.com/popstarqq/koa2-study)**