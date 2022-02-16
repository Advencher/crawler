import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import ticketsRouter from "./routes/tickets.js";
import compression from "compression";
import helmet from 'helmet';
import cors from 'cors';

const   corsOptions = {
  'origin': '*'
};
let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( compression() );
app.use( helmet() );
app.use( cors( corsOptions ) );
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err.message);
});
export default app;