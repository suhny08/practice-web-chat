const user = {
    email: "aaa@aaa.com",
    password: "aaa",
}

const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(8080, function () {
    console.log('listening on 8080 > server.js');
});

app.use(express.static(path.join(__dirname, 'react-project/build')));

// npm link cors
app.use(express.json());
var cors = require('cors');
app.use(cors());


// routes 
// var loginRouter = require('./server/routes/login.js');
// app.use('/login', loginRouter);

// login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'secuCode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.post('/login'
                 , passport.authenticate('local', {failureRedirect: '/fail'})
                 ,  function (req, res, next) {
                    console.log('logins.js redirect');
                    res.redirect('/');
                    }
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, function (iemail, ipassword, done) {
    //input email, password 
    console.log(iemail + ', ' + ipassword);

    if ( user.email === iemail && user.password === ipassword ) {
        return done(null, {email: iemail, password: ipassword});
    } else {
        console.log('wrong member');
        return done(null, false, { message: 'wrong member' });
    }
  }));



app.get('/fail', function(req, res) {
    // res.sendFile(path.join(__dirname, '/fail'));
    res.send('failed');
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});
