const http = require('http');
// cookie参数
// name|value|domain|path|max-age|expires|httpOnly
// domain限制域名，默认为当前域名
// path限制路径 基本上不用
// httpOnly为true的时候，在浏览器内不能通过js来读取修改该cookie的值，但可以通过application里面的cookie进行修改
const server = http.createServer((req, res) => {
    if(req.url === '/read'){
        const cookie = req.headers['cookie'];
        res.end(cookie);
    }else if(req.url === '/write'){
        res.setHeader('Set-Cookie', ["name=lxd; max-age=10; ", "age=10; path='/'; httpOnly=true"]);
        res.end('write ok')
    }else{
        res.end('not found');
    }
})

server.listen(3000);