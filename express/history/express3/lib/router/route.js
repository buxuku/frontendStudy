const Layer = require("./layer");

function Route() {
  this.stack = [];
}

Route.prototype.get = function(handlers) {
  handlers.forEach(handler => {
    const layer = new Layer("/", handler); // 里层的layer不关心path,只关心method,进行method匹配
    layer.method = "get";
    this.stack.push(layer);
  });
};
Route.prototype.dispath = function(req, res, out) {
  const requestMethod = req.method.toLowerCase();
  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) return out();
    const layer = this.stack[idx++];
    if (layer.method === requestMethod) {
      console.log('layer', layer.handler );
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
