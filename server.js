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
/sss
Code here ...

*/

// user authentication routes

router.get('/', require('./routes/home-new.js').get);
router.get('/login',require('./routes/login.js').get);
router.get('/logout', require('./routes/logout.js').get);

//Test routes
router.post('/payment', require('./routes/test-routes/payment.js').post); // payment to yandex
router.get('/test-login', require('./routes/test-routes/test-login.js').get); // to login as TEST STUDENT

//user routes
router.get('/user/:id', require('./routes/user/user.js').get);
router.get('/users', require('./routes/user/user-index.js').get); // multi user page
router.post('/user-edit', require('./routes/user/user-edit.js').post);

//group routes

router.get('/group/:id', require('./routes/group/group.js').get); //single group page
router.post('/group/:id', require('./routes/group/group-manage-members.js').post); //manage group members
router.get('/groups', require('./routes/group/group-index.js').get); //multi group page
router.get('/group', require('./routes/group/group-form.js').get); // to render group create/edit form


///lessons manage
router.get('/lesson-form', require('./routes/group/lesson-form.js').get);
router.post('/lesson-add', require('./routes/group/lesson-add.js').post);
router.get('/lesson/:id', require('./routes/group/lesson').get);
router.post('/lesson/:id', require('./routes/group/lesson-edit-delete').post)


router.post('/group-create', require('./routes/group/group-create.js').post);
router.post('/group-edit', require('./routes/group/group-edit.js').post);
router.post('/group-delete', require('./routes/group/group-delete.js').post);




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
