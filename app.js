const db = require("./utils/database");
global.express = require("express");
global.app = express();
global.cl = console.log, global.c = console.log;
const port = 80;

const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

const dbconfig = require("./config/database");
const params = dbconfig.params;
global.uuid = require("uuid/v4");


/*
 * Middleware
 */

app.use(cookieParser());

/*
 * Setting up the session
 */

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

/*
 * All of the application's routes
 */
require("./router/router");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
