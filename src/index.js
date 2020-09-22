import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import {sequelize} from './models/index.js';
import debug from 'debug';
import router from './config/routes.js';
import {config as cfg} from './config/config.js';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  origin: ['https://jessicajaniuk.com', 'https://www.jessicajaniuk.com', 'http://localhost:4200'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false
}));

app.use(bodyParser.json({
  limit : cfg.globals.bodyLimit
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/', router);

let port = process.env.PORT || cfg.globals.port;

// connect to db
sequelize.sync().then(() => {
  app.server.listen(port);
  app.server.on('error', onError);
  app.server.on('listening', onListening);
});

/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

let onListening = () => {
  const port = app.server.address().port;
  debug(`Listening at http://localhost:${port}`);
};


export default app;
