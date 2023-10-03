import createError from 'http-errors';
import express, { Router } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connect } from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import sslRedirect from 'heroku-ssl-redirect';

import brandsRouter from './routes/brands';
import colorsRouter from './routes/colors';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authConfig from './config/auth';


require('dotenv').config();

const app = express();

// eslint-disable-next-line
const baseDir = __dirname;
app.set('views', join(baseDir, 'views'));
app.set('view engine', 'jade');

connect(
  // eslint-disable-next-line no-undef
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`,
  {
    retryWrites: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
 
// enable ssl redirect
app.use(sslRedirect());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(baseDir, 'public')));
app.use(passport.initialize());

authConfig(passport);

app.use(
  '/',
  Router().get('/', (request, response) => {
    return response.json({
      name: 'Kahua BE',
      status: 'Healthy',
      code: 200,
    });
  })
);
app.use('/brands', brandsRouter);
app.use('/colors', colorsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
