const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
/*Production server
  server: {
    siteUrl: 'https://lk.akadplus.ru',
    appHost: '127.0.0.1',
    appPort: '3000',
    client_secret: 'CWWUwXFXOOw1UCJXIjef',
    client_id: '5895475'
  },
*/  
//Test server
  server: {
    siteUrl: 'http://astapovk.ru',
    appHost: '127.0.0.1',
    appPort: '3001',
    client_secret: 'Tgdhzq2AQuUn7l55smDu',
    client_id: '5974445'
  },
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'asapovk@gmail.com',
      password: 'eeeblulgam//tar16/211'
    },
    senders:  {
      // transactional emails, register/forgot pass etc
      default:  {
        fromEmail: 'asapovk@gmail.com',
        fromName:  'akadplus.ru',
        signature: "<em>С уважением,<br>akadplus.ru</em>"
      },
      /* newsletters example
      informer: {
        fromEmail: 'informer@gmail.com',
        fromName:  'Newsletters',
        signature: "<em>Have fun!</em>"
      }
      */
    }
  },
  mongoose: {
    uri:     'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    })
  },
  root:     process.cwd(),
  view: {

    root: defer(function(cfg) {
      return path.join(cfg.root, 'views');
    })
  }
};
