const Application = require('./application');
// 创建应用和应用本身进行分离
function express(){
    return new Application();
}
module.exports = express;