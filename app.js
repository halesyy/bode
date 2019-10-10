global.express = require("express");
global.app = express();
global.cl = console.log, global.c = console.log;
const port = process.env.PORT || 80;

const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

global.settings = require('./settings.json');
global.uuid = require("uuid/v4");

if (settings.use_database) {
  const db = require("./utils/database");
  const dbconfig = require("./config/database");
  const params = dbconfig.params;

  const sessionStore = new mysqlSession({
    host: params.host,
    port: params.dbport,
    user: params.username,
    password: params.password,
    database: params.database
  });

  app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));
}


/*
 * Middleware
 */

app.use(cookieParser());
app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * Setting up the session
 */

// if (usingDatabase) {

// }

/*
 * All of the application's routes
 */
require("./router/router");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
