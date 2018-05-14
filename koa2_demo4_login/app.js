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