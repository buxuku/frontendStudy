const http = require('http');
const Router = require('./router');

function Application() {
    this._router = new Router();
}

Application.prototype.get = function (path, handler) {
    this._router.get(path, handler);
}
Application.prototype.listen = function (...args) {
    const server = http.createServer((req, res) => {
        const done = function () {
            res.end('not found!');
        }
        this._router.handle(req, res, done);
    })
    server.listen(...args);
}

module.exports = Application;
