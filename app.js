var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var dotenv = require("dotenv");

dotenv.config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paymentsRouter = require('./routes/payments');
var paymentProcessingRouter = require('./routes/paymentProcessing');

var app = express();

app.use(cors());
app.use(bodyParser.raw({type: 'application/json'}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/payments", paymentsRouter);
app.use("/paymentProcessing", paymentProcessingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
