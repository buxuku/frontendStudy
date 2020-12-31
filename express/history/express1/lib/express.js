const http = require('http');
const url = require('url');

let routes = [
    {
        path: '*',
        method: 'all',
        handler(req, res) {
            res.end(`Cannot ${req.method} ${req.url}`);
        }
    }
]

function createApplication() {
    return {
        get(pathname, handler) {
            routes.push(
                {
                    pathname,
                    method: 'get',
                    handler
                }
            )
        },
        listen(...args) {
            const server = http.createServer((req, res) => {
                const {pathname} = url.parse(req.url);
                let requestMethod = req.method.toLowerCase();
                for (let i = 1; i < routes.length; i++) {
                    if (pathname === routes[i].pathname && requestMethod === routes[i].method) {
                        return routes[i].handler(req, res);
                    }
                }
                return routes[0].handler(req, res);
            })
            server.listen(...args);
        }
    }
}

module.exports = createApplication;