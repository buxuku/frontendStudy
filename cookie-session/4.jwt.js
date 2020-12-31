const http = require('http');
const querystring = require('querystring');
const secret = 'lxd';

const jwt = {
    sign(content, secret){
      return this.base64UrlEscpe(require('crypto').createHmac('sha256',secret).update(content).digest('base64'))
    },
    base64(value){
        return this.base64UrlEscpe(Buffer.from(JSON.stringify(value)).toString('base64'));
    },
    base64UrlEscpe(value){
        return value.replace(/\+/g, '-').replace(/\=/g, '').replace(/\//g, '_');
    },
    encode(content, secret){
        let header = this.base64({type: 'JWT', alg: 'HS256'});
        let body = this.base64(content);
        let sign = this.sign(header + '.' + body, secret);
        return header + '.' + body + '.' + sign;
    },
    base64UrlUnEscpe(value){
        value += new Array(5 - value.length % 4).join('=');
        return value.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(content, secret) {
        const [header, body, sign] = content.split('.');
        console.log('test', header, body, content );
        let newSign = this.sign(header + '.' + body, secret);
        if(sign === newSign){
            return JSON.parse(Buffer.from(this.base64UrlUnEscpe(body), 'base64').toString());
        }else{
            throw new Error('tooken error');
        }
    }
}
const server = http.createServer((req, res)=> {
    if(req.url === '/login'){
        const contentType = req.headers['content-type'];
        let arr = [];
        req.on('data',function(chunk){
            arr.push(chunk);
        })
        req.on('end', function(){
            const body = Buffer.concat(arr).toString();
            let data;
            if(contentType === 'application/x-www-form-urlencoded'){
                data = querystring(body);
            }
            if(contentType === 'application/json'){
                data = JSON.parse(body);
            }
            const { name, password } = data || {};
            if(name === 'lxd' && password === 123456){
                res.end(JSON.stringify({
                    message: 'login success',
                    // token格式： 头.内容.密钥
                    token: jwt.encode({
                        exp: new Date(Date.now() + 30 * 1000),
                        name: 'lxd',
                    }, secret)
                }))
            }else{
                res.end('login error');
            }
        })
    }
    if(req.url === '/check'){
        console.log('headers', req.headers);
        const authorization = req.headers['authorization'];
        if(authorization){
            try{
                const payload = jwt.decode(authorization, secret);
                let exp = new Date(payload.exp).getTime();
                if(exp < new Date().getTime()){
                    res.end('token expires')
                }else{
                   res.end('login ok')
                }
            }catch(err){
                console.log('error', err);
                res.end('auth error')
            }

        }else{
            res.end();
        }
    }
})
server.listen(4000);