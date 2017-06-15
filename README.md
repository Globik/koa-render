# koa-rend
[![NPM version](http://img.shields.io/npm/v/koa-rend.svg?style=flat)](https://npmjs.org/package/koa-rend) 
[![NPM Downloads](https://img.shields.io/npm/dm/koa-rend.svg?style=flat)](https://npmjs.org/package/koa-rend)

A light-weight template engine for Koa.js based on vanilla es6 template literals.
Each javascript file in a `views` direcory is a module on its own. Why not? The fact that

```javascript
const string = (name) = > `Hello ${name}!`
console.log(string("world")) // "Hello world!"
```
brings us to the modularity:

```javascript
// main_page.js

const main_page = obj = > {
return `
<html>
<body>
<h1>Hello ${obj.name}!</h1>
</body>
</html>`
}
module.exports = {main_page}

// and then in a router:

router.get('/', async ctx = > {
ctx.body = await ctx.render('main_page', {name: 'world'})
}
```
 Works good with ~~kao.js v1~~, v2. More flexibility, more custom behavor.
Low level api, it's all up to you.

## Installation

`npm install koa-rend`
Under the hood koa-rend uses [hotreloader.js](https://github.com/Globik/hotreloader) as a hot-reloading solution with no need the server restart. 
To enable hot-reloading please set `development:true` in options. In a production stage please set to false.

# Server example

```javascript
const Koa = require('koa');
const Router=require('koa-router');
const render = require('koa-rend');

const app = new Koa();
const router = new Router();
// root - directory of templating files
// development if true hotreloader.js will work, others will not work
render(app,{root:'views', development: true})

app.use(async (ctx, next) = > {
//global variables are available via koa's ctx.state instance: 

ctx.state.time = new Date()
ctx.state.to_upper_case = string = > string.toUpperCase()
await next()
})



router.get('/', async ctx = > {
const name = 'world';

// ctx.render(file_name,{...variables})
//render the main_page.js from the views directory
ctx.body = await ctx.render('main_page', {name: name})
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)
```
## main_page.js

```javascript
//main_page.js

const main_page = n = >{
return `
<html>
<body>
<h1>Hello ${n.name}!</h1>
// koa-passport.js is using ctx.state.user instance available from everywhere
<p>Hi user! Your name is ${n.user ? n.user : 'a guest'}</p>
<p><b>Data:</b>${n.time}</p>
<p><b>Your name to upper case:</b>${n.to_upper_case(n.name)}</p>
</body>
</html>`;
}
module.exports = {main_page}
```
## Options
1. root - it's a root directory where are our templating javascript files. `views` or any other.
2. development - true or false. hotreloader.js would work if true. Default false.
Under the hood koa-render uses `hotreloader.js` for hot-reloading with no need server to restart. `hoteloader.js` listen to the directory of root folder.
Nested directories koa-rend does not support. Support only `.js` extension files.

## Naming convention

As it is you may need to giving the unique and the same names to your files and functions with underscore
Let's say your site have admin and users parts.
So in a `views` directory just for example
`- admin_articles.js
- admin_dashboard.js
- user_dashboard.js
- README
etc
`

Just name the function also the same:
```javascript
//admin_articles.js
const admin_articles = n => {return `blah blah blah`}

module.exports = {admin_articles}

await ctx.render('admin_articles', {})
```
## Hot-reloading

In order to hot-reloading the files after some modifications you may need to set a development field to true. 
Hot-reload does not work with destructuring assignments

As it is:

```javascript
//some_module.js
const some_var = n = > { return `Hello ${n.name}!`}
module.exports = {some_var}

// bad:

var {some_var} = require('some_module.js');//hot-reloading will not work
var s = some_var({name:"Globik"})

// not so bad:

var some_var = require('some_module.js'); // hot-reloading will work
var s=some_var.some_var({name:"Globik"});
console.log(s)// > "Hello, Globik!"
```

## Vanilla javascript for a based functionalities

Includes, partials like in other template engines can be achieved with javascript.
One module can include other modules.

```javascript
//head.js
const head = n = > {
return `
<meta charset="utf-8">
<title>${n.title ? n.title : "Simple title"}</title>
<link rel="shortcut icon" type="image/ico" href="/images/w4.png"> 

${n.cssl ? get_cssl(n) : ''}
${n.csshelper ? `<style>${n.csshelper}</style>`:``}
${n.js ? get_js(n):''}
`;
}

function get_cssl(n){
let s='';
n.cssl.forEach((el,i)=>{
s+=`<link href="${el}" rel="stylesheet">`;
})
return s;
}

function get_js(n){
let s='';
n.js.forEach((el,i)=>{
s+=`<script src="${el}"></script>`;
})
return s;
}

module.exports = {head}

//footer.js

const footer = n = > { return `<b>footer content</b>`;}
module.exports = {footer}

//main_page.js

const head = require('./head.js');
const footer = require('./footer.js');

const main_page = n = > {
return `
<html>
<head>${head.head({cssl:['/css/css_1.css', '/css/css_2.css'], csshelper: `${get_style()}`, js:['/js/js_1.js']})}</head>
<body>
<h1>Some content.</h1>
<footer>${footer.footer({})}</footer>
</body>
</html>
`;
}
function get_style(){
return 	`
h1 {background: green;}
`;
}
module.exports={main_page}
```

## forEach loop

```javascript

`<div>${n.posts ? get_list(n.posts) : ''}</div>`
....
function get_list(array){
let s='<ul>';
array.forEach((el, i)=>{
s+=`<li>${el.post_title}<li>${el.post_author}<li>${el.post_body}`
})
return s;
}
```

## Vidgets like workaround

You can directly render the simply modules(via ajax requests)
For example:

```javascript 
//vidget_hello_world.js

const vidget_hello_world = n = > {
return `<b>Date:</b>${n.date}`;
}
module.exports = {vidget_hello_world}

//router.js

router.post('/get_date_vidget', async ctx = > {
var date = new Date();
ctx.body = {info: "OK", content: await ctx.render('vidget_hello_world',{date: date})}
})

// on a client side the ajax post-call to '/get_date_vidget':
<div id="content"></div>
...
xhr.open('post', '/get_date_vidget');
xhr.onload = function(ev){
if(xhr.status == 200){
var data = JSON.parse(this.response);
document.getElementById('content').innerHTML = data.content;
console.log(data.info);
}}
...
```
# Examples

[Examples](https://github.com/Globik/koa-render/tree/master/examples)

Also see a real world [example](https://github.com/Globik/alikon/tree/master/views)


## Caveats
- in memory
- no highlighting for html template literals syntax in a most well known code editors. Just one color.
- some times hot reloading works not correctly. It's a bug. One need rechange the file.
- no layout support.