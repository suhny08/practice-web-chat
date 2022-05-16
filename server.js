// import socket from './socket';
// const socket = require('./socket');
var userData = require('./userData');

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'practice-web-chat/build')));

// client 8080 
// server 3000
const http = require('http').createServer(app);
const { Server }  = require('socket.io');
const io = new Server(http);

http.listen(8080, () => {
    console.log('listening on *:8080');
});




// npm link cors
app.use(express.json());
var cors = require('cors');
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


// login  
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({
  secret : 'anything', 
  resave : false, 
  rolling: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 3,
    httpOnly: true,
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session()); 

const isAuthenticated = () => (req, res, next) => {
  console.log('is Authenticated?'+ req.user);
  
  if (!req.user) {
    return res.send("false"); //res.sendStatus(403);
  }
  next();
}


app.get('*', isAuthenticated(), (req, res) => {
  var user_info = null;
  console.log(' * ');
  if (!req.user) {
    user_info = [];
  } else {
    user_info = JSON.parse(JSON.stringify(req.user));
  }
  res.json(user_info);
})

function isUser(req, res, next) {
  console.log('isUser? ');
  
  var user_info = null; 
  if (!req.user) {
    user_info = [];
  } else {
    user_info = JSON.parse(JSON.stringify(req.user));
  }
  return res.json(user_info);
}


app.post('/loginf', passport.authenticate('local', {failureRedirect : '/login'}), function(req, res){
  res.redirect('/');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function (err, eUser, info) {
    if (err) return next(err);

    console.log('eUser ' + JSON.stringify(eUser));

    if (eUser) {
      req.logIn(eUser, function(err) {
        console.log('local > logIn');
        if (err) return next(err);
        return res.json(eUser);
      })
    } else {
      console.log('login failed');
      res.send([]);
    }
  })(req, res, next);
}
)

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true,
  }, function (req, iemail, ipassword, done) {
    //input email, password (usernameFiled, passwordField값이 iemail, ipassword로 대입됨)
    // console.log(iemail);
    console.log('email: ' + iemail + ', password: ' + ipassword);
    
    console.log('local Starategy');
    if ( userData.email === iemail && userData.password === ipassword ) {
        console.log('login success');
        return done(null, {email: iemail, password: ipassword});
    } else {
        console.log('wrong member');
        return done(null, false, { message: 'wrong member' });
    }
  }));


  // 사용자 session 생성 -> (쿠키) 사용자의 브라우저로 전송
  passport.serializeUser(function(user, done) {
    console.log('ser', user);
    done(null, user);
  });  
  // 로그인 한 사용자가 페이지(사용자 페이지 등)에 접속했을 때 실행되는 함수
  passport.deserializeUser(function(user, done) {
    console.log('deser', user);
    done(null, user);
  });

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('send-message', (msg) => {
    console.log(msg);
    io.emit('broadcast', msg);
  });


});
