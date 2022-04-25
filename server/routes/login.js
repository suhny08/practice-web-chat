const user = {
    email: "aaa@aaa.com",
    password: "aaa",
}

const express = require('express');
const router = express.Router();
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'secuCode', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

router.post('/', passport.authenticate('local', {failureRedirect: '/fail'}),  function (req, res, next) {
    console.log('logins.js redirect');
    res.redirect('/');
});

console.log('login.js ... ');

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
        return done(null, false, { message: 'wrong member' });
    }
  }));



module.exports = router;