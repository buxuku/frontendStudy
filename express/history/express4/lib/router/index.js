const url = require("url");
const methods = require("methods");
const Route = require("./route");
const Layer = require("./layer");

function Router() {
  this.stack = [];
}

Router.prototype.route = function(path) {
  let route = new Route();
  let layer = new Layer(path, route.dispath.bind(route)); //每次调用get方法，产生一个Layer实例和Route实例
  layer.route = route;
  this.stack.push(layer);
  return route;
};

methods.forEach(method => {
  Router.prototype[method] = function(path, handler) {
    let route = this.route(path);
    route[method](handler);
  };
});

Router.prototype.handle = function(req, res, done) {
  const { pathname } = url.parse(req.url);
  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) {
      return done();
    }
    let layer = this.stack[idx++];
    if (layer.mathPath(pathname)) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Router;
