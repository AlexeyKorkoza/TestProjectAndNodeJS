require('dotenv').config();import express from 'express';import morgan from 'morgan';import bodyParser from 'body-parser';import methodOverride from 'method-override';import mongoose from 'mongoose';import passport from 'passport';import fs from 'fs';import flash from 'connect-flash';import session from 'express-session';import cors from 'cors';import path from 'path';import favicon from 'serve-favicon';import connectMongo from 'connect-mongo';import routes from './app/routes';import initPassport from './app/passport/passport-init';import config from './app/config';import logger from './app/utils/logger';const app = express();const MongoStore = connectMongo(session);mongoose.Promise = global.Promise;if (process.env.NODE_ENV === 'production') {    mongoose.connect(`mongodb://${config.mongoDB.userName}:${config.mongoDB.password}@${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.dbName}`, {            server: {                reconnectTries: 10,                reconnectInterval: 10000            }        })} else {   mongoose.connect(`${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.dbName}`);}app.use(favicon(path.join(__dirname, '/favicon.png')));app.use('/public', express.static(path.join(__dirname, 'public')));app.use('/uploads', express.static(path.join(__dirname, 'uploads')));app.set('view engine', 'ejs');app.set('views', path.join(__dirname, 'app', 'views'));app.use(morgan('dev'));app.use(bodyParser.urlencoded({ extended: true }));app.use(bodyParser.json());app.use(methodOverride());app.use(  session({    secret: config.session.secret,    store: new MongoStore({ mongooseConnection: mongoose.connection }),    saveUninitialized: true,    resave: true,    cookie: { httpOnly: true },  }));app.use(passport.initialize());app.use(passport.session());app.use(flash());app.use(cors());app.use('/', routes);app.use((req, res, next) => {    res.status(404).render('404.ejs');});if (!fs.existsSync('./uploads')) {  fs.mkdirSync('./uploads');}initPassport(passport);app.listen(config.port, () => {    logger.info(`Server started on port ${config.port}`);});export default app;