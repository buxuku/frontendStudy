function Layer(path, handler){
    this.path = path;
    this.handler = handler;
}

Layer.prototype.mathPath = function(pathname){
    return this.path === pathname;
}
Layer.prototype.handle_request = function(req, res, next){ //语义化，以及做扩展
    this.handler(req, res, next);
}
module.exports = Layer;