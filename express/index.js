const express = require('./history/express5')
const app = express();
app.use((req, res, next)=>{
    console.log('all',1 );
    next();
})
app.use('/', (req, res, next) => {
    console.log('/ use middleware');
    next();
})
app.get('/', (req, res, next) => {
    console.log('home' );
    next();
},(req, res) => {
    res.end('ok');
})
app.get('/test', (req, res) => {
    res.end('test');
})
app.get('/user', (req, res, next) => {
    next('error');
})
app.post('/post', (req, res) => {
    res.end('post');
})

app.use(function(req, res, next, err){
    res.end('end');
})
app.listen(8012, function (err, data){
    console.log('server started', `http://127.0.0.1:8012`);
})