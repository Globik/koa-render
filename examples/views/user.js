const head=require('./head.js');
const footer=require('./footer.js');

const user=n=>{
return `
<html>
<head>
${head.head({title:'user page'})}
</head>
<body>
<nav><a href="/">home</a></nav><br><br>
<h1>Here must be user object!</h1>
<li><b>user name:</b>${n.user.name}
<li><b>user id:</b>${n.user.id}
<li><b>is member?</b>${n.user.member}
<hr>
<b>Data:</b>${n.time}
<hr>
<h3>Ajax user content ddddd</h3>
<button onclick="get_user();">ajax get hello world vidget</button><br>
<div id="content" style="border:1px solid green;"></div>
<script>
function get_user(){
var xhr=new XMLHttpRequest();
xhr.open('post','/hello_vidgeta');
//xhr.setRequestHeader('Content-Type','application/json','utf-8');
xhr.onload=function(ev){
if(xhr.status==200){
alert(this.response);
/*
var json=JSON.parse(this.response);
content.innerHTML=json.content;
console.log(json.info);
*/
}else{console.warn(this.response);}
}
xhr.onerror=function(e){console.log(e);}
var ata={};
ata.hello="hello";
//xhr.send(ata);
xhr.send();
}
</script>
<footer>
${footer.footer({})}
</footer>
</body>
</html>
`;
}
module.exports={user}