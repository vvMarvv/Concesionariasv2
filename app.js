let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override')

/* Enrutadores */
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let sucursalesRouter = require('./routes/sucursales');
let autosRouter = require('./routes/autos')
let adminRouter = require('./routes/admin')


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

/* Middlewares de rutas */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sucursal', sucursalesRouter);
app.use('/autos', autosRouter)
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
