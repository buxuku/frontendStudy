const Layer = require("./layer");
const methods = require("methods");

function Route() {
  this.stack = [];
}

methods.forEach(method => {
  Route.prototype[method] = function(handlers) {
    handlers.forEach(handler => {
      const layer = new Layer("/", handler); // 里层的layer不关心path,只关心method,进行method匹配
      layer.method = method;
      this.stack.push(layer);
    });
  };
});

Route.prototype.dispath = function(req, res, out) {
  const requestMethod = req.method.toLowerCase();
  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) return out();
    const layer = this.stack[idx++];
    if (layer.method === requestMethod) {
      layer.handle_request(req, res, next);
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
