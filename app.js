const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const issueRouter = require('./routes/issueRouter');
const projectRouter = require('./routes/projectRouter');
const userRouter = require('./routes/userRouter');
const app = express();

//1) GLOBAL MIDDLEWARES

// Serving static file
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
);

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against cross site scripting attacks XSS
app.use(xss());

//3) MOUNT ROUTES
app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;