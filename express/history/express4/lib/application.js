const http = require("http");
const Router = require("./router");
const methods = require("methods");

function Application() {}

Application.prototype.lazy_route = function() {
  // 路由系统懒加载，当需要用到路由系统的时候才进行加载。
  if (!this._router) {
    this._router = new Router();
  }
};

methods.forEach(method => {
  Application.prototype[method] = function(path, ...handler) {
    this.lazy_route();
    this._router[method](path, handler);
  };
});

Application.prototype.listen = function(...args) {
  const server = http.createServer((req, res) => {
    this.lazy_route();
    const done = function() {
      res.end("not found");
    };
    this._router.handle(req, res, done);
  });
  server.listen(...args);
};

module.exports = Application;
