const hello_vidget=n=>{
return `${n.user ? get_user(n) : ''}`;
}
module.exports={hello_vidget}

function get_user(n){
return `
<ul><li><b>name:</b>${n.user.name}
<li><b>user id:</b>${n.user.id}
<li><b>member:</b>${n.user.member}</ul>`;
}