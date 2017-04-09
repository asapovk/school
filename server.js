const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const https = require('https');
const privateKey  = fs.readFileSync('/etc/letsencrypt/keys/0000_key-certbot.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/lk.akadplus.ru/fullchain.pem', 'utf8');
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

//Test routes
router.post('/payment', require('./routes/test-routes/payment.js').post);
router.get('/test-login', require('./routes/test-routes/test-login.js').get);
router.get('/hbs-test', require('./routes/test-routes/hbs-test.js').get);

//Yandex payment group
router.get('/checkout', require('./routes/yandex-pay/checkout.js').get);
router.post('/check', require('./routes/yandex-pay/check.js').post);
router.post('/aviso', require('./routes/yandex-pay/aviso.js').post);

//Tinkoff paymet group
router.get('/tinkoff-checkout', require('./routes/tinkoff-pay/tinkoff-checkout.js').get);
router.post('/tinkoff-aviso', require('./routes/tinkoff-pay/tinkoff-aviso.js').post);
router.get('/tinkoff-success', require('./routes/tinkoff-pay/tinkoff-success.js').get);
router.get('/tinkoff-fail', require('./routes/tinkoff-pay/tinkoff-fail.js').get);

app.use(router.routes());

app.keys = ['some secret hurr'];
app.listen('3001',"127.0.0.1" , ()=>{
    console.log('listening port 3001');
});

//hello!


//https.createServer(credentials, app.callback()).listen('443', ()=>{
//  console.log('listening port 443');
//});
