const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
var config = require('config');
var pjson = require('./package.json');

const https = require('https');
//const privateKey  = fs.readFileSync('/etc/letsencrypt/keys/0000_key-certbot.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/lk.akadplus.ru/fullchain.pem', 'utf8');
//const credentials = {key: privateKey, cert: certificate};

const app = new Koa();
const router = new Router();


const handlers = fs.readdirSync(path.join(__dirname,'middlewares')).sort();

handlers.forEach( handler => require('./middlewares/' + handler).init(app));

/*

Code here ...

*/

// user authentication routes

router.get('/', require('./routes/home.js').get);
router.get('/login',require('./routes/login.js').get);
router.get('/logout', require('./routes/logout.js').get);

//Test routes
router.post('/payment', require('./routes/test-routes/payment.js').post); // payment to yandex
router.get('/test-login', require('./routes/test-routes/test-login.js').get); // to login as TEST STUDENT

//user routes
router.get('/user/:id', require('./routes/user/user.js').get); // single user page
router.get('/user-index', require('./routes/user/user-index.js').get); // multi user page


//group routes
router.get('/group/:id', require('./routes/group/group.js').get); //single group page
router.get('/group-index', require('./routes/group/group-index.js').get); //multi group page

router.post('/group-manage', require('./routes/group/group-manage.js').post); // to invite/kickout/accept users to the group
router.post('/group-charge', require('./routes/group/group-charge.js').post); // to charge group members by some value, that will be added to teacher's balance

router.get('/group', require('./routes/group/group-create-form.js').get); // to render group create/edit form

router.post('/group-create', require('./routes/group/group-create.js').post);
router.post('/group-edit', require('./routes/group/group-edit.js').post);
router.post('/group-delete', require('./routes/group/group-delete.js').post);



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
app.listen(config.server.appPort, config.server.appHost , ()=>{
    console.log('listening port '+config.server.appPort);
    console.log('ver '+pjson.version);
});

//hello!


//https.createServer(credentials, app.callback()).listen('443', ()=>{
//  console.log('listening port 443');
//});
