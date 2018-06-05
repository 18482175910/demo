const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');

const app = new Koa();
const router = new Router();

const secret = 'jwt demo';

app.use(bodyParser());

app.use(router.routes())
   .use(router.allowedMethods());

router.post('/login',async(ctx,next) => {
  const user = ctx.request.body
  if(user && user.name) {
      let userToken = {
          name: user.name
      }
      const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
      ctx.set('token',token);
      ctx.body = {
          message: '获取token成功',
          code: 1,
          token
      }
  } else {
      ctx.body = {
          message: '参数错误',
          code: -1
      }
  }
})

app.listen(3000,()=>{
     console.log('app listening 3000......')
   })