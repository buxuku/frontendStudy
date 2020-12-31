const express = require('./history/express4')
const app = express();
app.get('/', (req, res, next) => {
    console.log('home' );
    next();
},(req, res) => {
    res.end('ok');
})
app.get('/test', (req, res) => {
    res.end('test');
})
app.post('/post', (req, res) => {
    res.end('post');
})
app.listen(8012, function (err, data){
    console.log('server started', `http://127.0.0.1:8012`);
})