const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');


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


app.use(router.routes());

app.keys = ['some secret hurr'];
app.listen('3000', ()=>{
    console.log('listening port 3000');
});
