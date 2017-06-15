/*const Koa=require('../../koa/node_modules/koa');
const render=require('../../koa/node_modules/koa-rend');
const koaBody=require('../../koa/node_modules/koa-body');
const serve=require('../../koa/node_modules/koa-static');
const Router=require('../../koa/node_modules/koa-router');
*/
const Koa=require('koa');
const render=require('koa-rend');
const koaBody=require('koa-body');
const serve=require('koa-static');
const Router=require('koa-router');

const app=new Koa()
const router=new Router();
render(app,{root:'views', development: true});
app.use(koaBody());

app.use(serve(__dirname+'/public'));



app.use(async (ctx, next)=>{
ctx.state.time=new Date()
await next()
})
var user={id:1, name: 'Globik', member: true}
var str='world';
router.get('/', async ctx=>{
ctx.body=await ctx.render('main_page',{str: str})
})

router.get('/user',koaBody(), async ctx=>{
ctx.body=await ctx.render('user',{user: user})
})

router.post('/hello_vidgeta', async ctx=>{
let data=await ctx.render('hello_vidget',{user:user});
ctx.body={info:"OK", content: data}
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)
console.log('server on port 5000')