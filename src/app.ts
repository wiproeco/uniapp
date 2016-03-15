import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import index from './routes/index';
import users from './routes/users';
import environment from './routes/environment';
import location from './routes/location';
import statusPlugin from './routes/statusPlugin';
import outPutJson from './routes/outPutJson';

import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet


const app: express.Express = express();


// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use ('/api/getEnvironments',environment);
app.use ('/api/getLocations',location);
app.use('/api/GetStatusForAllPlugins',statusPlugin)
app.use('/api/getOutputJSon',outPutJson)

// catch 404 and forward to error handler
app.use(((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
}));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
  return null;
});


export default app;