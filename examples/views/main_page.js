const head=require('./head.js');
const footer=require('./footer.js');

const main_page=n=>{
return `
<html>
<head>
${head.head({title:'main page',cssl:['/css/css_1.css'],csshelper:`${get_cssHelper()}`,js:['/js/js_1.js']})}
</head>
<body>
<nav><a href="/user">user</a></nav><br><br>
<h1>Hello ${n.str}!</h1>
<h2>Some content</h2>
<b>Data:</b>${n.time}
<footer>
${footer.footer({})}
</footer>
</body>
</html>
`;
}
module.exports={main_page}
function get_cssHelper(){
return `h2{background:lightblue}`;
}