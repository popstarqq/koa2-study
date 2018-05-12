//koa-router中间件demo2，多层嵌套
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

//子路由1
let page1 = new Router();
page1.get('/home', async(ctx)=>{
    ctx.body="/page1/home/";
});
page1.get('/todo',async(ctx)=>{
    ctx.body="/page1/todo/";
});
//子路由2 
let page2 = new Router();
page2.get('/home', async(ctx)=>{
    ctx.body="/page2/home/";
});
page2.get('/todo',async(ctx)=>{
    ctx.body="/page2/todo/";
});
//父级路由
let router = new Router();
router.use('/page1',page1.routes());
router.use('/page2',page2.routes());

app.use(router.routes());
app.listen(3000,()=>{
  console.log('starting at port 3000');
});