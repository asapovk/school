const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const https = require('https');
const privateKey  = fs.readFileSync('/home/asapovk/certs/key.pem', 'utf8');
const certificate = fs.readFileSync('/home/asapovk/certs/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = new Koa();
const router = new Router();


const handlers = fs.readdirSync(path.join(__dirname,'middlewares')).sort();

handlers.forEach( handler => require('./middlewares/' + handler).init(app));

/*

Code here ...

*/

router.get('/', require('./routes/home.js').get);
router.get('/login',require('./routes/login.js').get);
router.get('/logout', require('./routes/logout.js').get);
router.get('/checkout', require('./routes/checkout.js').get);
router.post('/payment', require('./routes/payment.js').post);
router.get('/test-login', require('./routes/test-login.js').get);
router.post('/check', require('./routes/check.js').post);
router.post('/aviso', require('./routes/aviso.js').post);
router.get('/tinkoff-checkout', require('./routes/tinkoff-checkout.js').get);
router.post('/tinkoff-aviso', require('./routes/tinkoff-aviso.js').post);

app.use(router.routes());

app.keys = ['some secret hurr'];
app.listen('80', ()=>{
    console.log('listening port 80');
});




//https.createServer(credentials, app.callback()).listen('443', ()=>{
//  console.log('listening port 443');
//});
