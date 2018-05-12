//Koa-router 中间件demo1

const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// add url-route:
router.get('/', async (ctx) => {
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

router.get('/error', async (ctx) => {
    ctx.response.body = `<h1>error</h1>`;
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('xiaobai started at port 3000...');