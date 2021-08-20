function Layer(path, handler){
    this.path = path;
    this.handler = handler;
}

Layer.prototype.mathPath = function(pathname){
    if(this.path === pathname){
        return true;
    }
    // 中间件只需要匹配开头就可以了
    if(!this.route){
        if(pathname === '/' || this.path === '/'){
            return true;
        }
        return pathname.startsWith(this.path + '/');
    }
    return false;
}
Layer.prototype.handle_request = function(req, res, next){ //语义化，以及做扩展
    this.handler(req, res, next);
}
module.exports = Layer;