/**
 * 实现对cookie读取的封装，对cookie增加签名功能
 * @type {module:http}
 */
const http = require('http');
const crypto = require('crypto');
const querystring = require('querystring');

const key = 'lxd';

function singed(value) {
    return crypto.createHash('sha256', key).update(value).digest('base64');
}

const server = http.createServer((req, res) => {
    req.getCookie = function (name, isSinged) {
        const cookies = req.headers['cookie'];
        const cookieObj = querystring.parse(cookies, '; '); // 默认分隔符为&
        const value = cookieObj[name] && cookieObj[name].split('.')[0];
        if (isSinged) {
            return cookieObj[name].split('.')[1] === singed(value) ? value : '';
        } else {
            return value;
        }
    }
    let cookies = [];
    res.setCookie = function (name, value, options) {
        let optArgs = [];
        if (options.maxAge) {
            optArgs.push(`max-age=${options.maxAge}`);
        }
        if (options.httpOnly) {
            optArgs.push('httpOnly=${options.httpOnly}');
        }
        if (options.singed) {
            value = value + '.' + singed(value);
        }
        cookies.push(`${name}=${value}; ${optArgs.join('; ')}`)
        res.setHeader('Set-Cookie', cookies);
    }
    if (req.url === '/read') {
        const cookie = req.getCookie('name', true);
        res.end(cookie);
    } else if (req.url === '/write') {
        res.setCookie('name', 'lxd', {maxAge: 60, httpOnly: true, singed: true})
        res.end('write ok')
    } else {
        res.end('not found');
    }
})

server.listen(3000);
