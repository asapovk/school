const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
//Production server

  server: {
    siteUrl: 'http://polyakov.astapovk.ru',
    appHost: '127.0.0.1',
    appPort: '3001',
    client_secret: 'CWWUwXFXOOw1UCJXIjef',
    client_id: '5895475',
    mongoose: {
      uri:     'mongodb://localhost/app',
      options: {
//        user: 'lk.akadplus.ru',
//        pass: 'CWWUwXFXOOw1UCJXIjef',
//        auth: {authdb:"app"},
        server: {
        socketOptions: {
            keepAlive: 1
          },
          poolSize:      5
        }
      }
    }
  },

//Test server
/*
  server: {
    siteUrl: 'http://astapovk.ru',
    appHost: '127.0.0.1',
    appPort: '3001',
    client_secret: 'Tgdhzq2AQuUn7l55smDu',
    client_id: '5974445',
    mongoose: {
      uri:     'mongodb://localhost/appTest',
      options: {
        user: 'astapovk.ru',
        pass: 'Tgdhzq2AQuUn7l55smDu',
        auth: {authdb:"appTest"},
        server: {
        socketOptions: {
            keepAlive: 1
          },
          poolSize:      5
        }
      }
    }
  },
*/
//localServer
/*
server: {
  siteUrl: 'http://localhost',
  appHost: '127.0.0.1',
  appPort: '3001',
  client_secret: '8JUIkbn7k2HCWx6vkNVC',
  client_id: '6061723',
  mongoose: {
    uri:     'mongodb://localhost/appLocal',
    options: {
    //  user: 'localhost',
    //  pass: 'Tgdhzq2AQuUn7l55smDu',
    //  auth: {authdb:"appLocal"},
      server: {
      socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  }
},
*/
/*
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'asapovk',
      password: 'none'
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

    }
  },
*/
  mongoose: {
    uri:     'mongodb://localhost/app',
    options: {
      user: 'lk.akadplus.ru',
      pass: 'CWWUwXFXOOw1UCJXIjef',
      auth: {authdb:"app"},
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
