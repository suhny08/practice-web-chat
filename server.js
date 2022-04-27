const user = {
    email: "111",
    password: "111",
}

const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(8080, function () {
    console.log('listening on 8080 > server.js');
});

app.use(express.static(path.join(__dirname, 'practice-web-chat/build')));

// npm link cors
app.use(express.json());
var cors = require('cors');
app.use(cors());


// routes 
// var loginRouter = require('./server/routes/login.js');
// app.use('/login', loginRouter);


// app.get('/login', function(req, res) {
//     // res.sendFile(path.join(__dirname, './login'));
//     res.send('login');
// });


app.get('/fail', function(req, res) {
    // res.sendFile(path.join(__dirname, '/fail'));
    res.send('failed');
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});



// login  
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'secuCode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.post('/login'
                 , passport.authenticate('local', {
                  successRedirect: 'http://localhost:3000/',
                  failureRedirect: '/fail' 
                 })
                //  ,  function (req, res, next) { res.redirect('/fail'); }
                
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, function (iemail, ipassword, done) {
    //input email, password 
    console.log('email: ' + iemail + ', password: ' + ipassword);

    if ( user.email === iemail && user.password === ipassword ) {
        console.log('login success');
        return done(null, {email: iemail, password: ipassword});
    } else {
        console.log('wrong member');
        return done(null, false, { message: 'wrong member' });
    }
  }));


  // 사용자 session 생성 -> (쿠키) 사용자의 브라우저로 전송
  passport.serializeUser(function(user, done) {
    done(null, user);
  });  
  // 로그인 한 사용자가 페이지(사용자 페이지 등)에 접속했을 때 실행되는 함수
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });