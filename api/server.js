const express = require('express');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('../data/dbConfig');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./config-middleware.js');

const server = express();

const sessionConfig = {
    name: 'cookieMonster',
    secret: 'process.env.SESSION_SECRET' || 'keep it secret, keep it safe!', // used for cookie encryption
    cookie: {
      maxAge: 1000 * 60 * 10, // 10 minutes in ms
      secure: false, // set to true in production, only send cookies over HTTPS
      httpOnly: true, // JS cannot access the cookies on the browser
    },
    resave: false,
    saveUninitialized: true, // read about it for GDPR compliance  
    store: new knexSessionStore({
      knex: dbConnection,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 60000,
    })
  };

configureMiddleware(server);

server.use(session(sessionConfig))
server.use(express.json());
server.use('/api', apiRouter);

module.exports = server;

