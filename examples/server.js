//const Koa=require('koa');
//const render=require('koa-render');
const Koa=require('../../koa/node_modules/koa');
const render=require('../../alikon/libs/render.js');
const koaBody=require('../../koa/node_modules/koa-body');
const serve=require('../../alikon/node_modules/koa-static');
const Router=require('../../koa/node_modules/koa-router');

const app=new Koa()
const router=new Router()
app.use(serve(__dirname+'/public'));
render(app,{root:'views', development: true})
app.use(koaBody())

app.use(async (ctx, next)=>{
ctx.state.time=new Date()
await next()
})
var user={id:1, name: 'Globik', member: true}
var str='world';
router.get('/', async ctx=>{
ctx.body=ctx.render('main_page',{str: str})
})

router.get('/user', async ctx=>{
ctx.body=ctx.render('user',{user: user})
})

router.post('/hello_vidget', async ctx=>{
ctx.body={info:"OK", content: ctx.render('hello_vidget',{user: user})}
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)
console.log('server on port 5000')