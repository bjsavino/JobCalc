import express from 'express';
import path from 'path';
const router = require("./router");
const flash = require("connect-flash");
const session = require('express-session')
import passport from 'passport'
const configPassport = require('./Utils/passport')

configPassport(passport);

const app = express();

app.use(session({
    secret: 'jobcalc secret',
    resave: true,
    saveUninitialized: true,
  }));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"))
app.use(router);


app.listen(3030,()=>console.log("rodando"));
