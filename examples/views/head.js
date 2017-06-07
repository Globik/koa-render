const head=n=>{
return `
<meta charset="utf-8">
<title>${n.title ? n.title : "Simple title"}</title>
<!-- <link rel="shortcut icon" type="image/ico" href="/images/w4.png"> -->

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