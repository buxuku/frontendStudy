/**
 * cookie配合session使用，
 * @type {module:http}
 */
const http = require('http');
const crypto = require('crypto');
const querystring = require('querystring');

const key = 'lxd';

function singed(value) {
    return crypto.createHash('sha256', key).update(value).digest('base64');
}

const session = {};
const cardName = 'connectId';
const server = http.createServer((req, res) => {
    req.getCookie = function (name, isSinged) {
        const cookies = req.headers['cookie'];
        const cookieObj = querystring.parse(cookies, '; '); // 默认分隔符为&
        const value = cookieObj[name] && cookieObj[name].split('.')[0];
        if (isSinged) {
            return cookieObj[name] && cookieObj[name].split('.')[1] === singed(value) ? value : '';
        } else {
            return value;
        }
    }
    let cookies = [];
    res.setCookie = function (name, value, options = {}) {
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
    if (req.url === '/cut') {
        const cookie = req.getCookie(cardName);
        if (cookie && session[cookie]) {
            session[cookie].money -= 20;
            res.end(session[cookie].money + '');
        } else {
            const connectId = Date.now() + ''; // 可以使用uuid模块来更安全地生成
            res.setCookie(cardName, connectId, {httpOnly: true});
            session[connectId] = {money: 100};
            res.end(session[connectId].money + '');
        }
    } else {
        res.end('not found');
    }
})

server.listen(3000);
