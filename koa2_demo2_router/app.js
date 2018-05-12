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
console.log('[demo] start-quick is starting at port 3000')