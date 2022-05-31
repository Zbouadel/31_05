const express = require('express');
const session = require('express-session');
//const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config();
const morgan = require('morgan')
const app = express();
require('./helpers/init_mongodb');
const isAuth = require("./middleware/is-auth");

const store = new MongoDBSession({
  uri:process.env.URL,
  collection : 'mySessions',
})

app.use(session({
  secret:'key',
  resave:false,
  saveUninitialized:false,
  store:store,
}));

// views
app.set('view-engine','ejs');

// Routes Declaration     
const Register = require('./routes/register.route');
const Login = require('./routes/login.route');
const Verification = require('./routes/verification.route')
const Membre = require('./routes/membre.route')

app.use(morgan('dev')); // :method :url :status :response-time ms - :res[content-length]
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//app.use(cors());


//Routes declaration :
app.use('/register',isAuth.no,Register);
app.use('/login',isAuth.no,Login);
app.use('/verification',Verification);
app.use('/membre',Membre);
//app.use('/schoolregister',isAuth.no,Register)

app.get('/',(req,res)=>{
  res.render('index.ejs');
});
app.get('/connected',isAuth.yes,(req,res)=>{
  res.render('connected.ejs');
});
app.post('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      throw err;
    }
    res.redirect('/');
  })

})

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
