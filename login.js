 
const express = require('express');
const path = require('path');
const app = express(); 


// login  
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'a123',
    name: 'hosi',
    resave: true,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (request, response) => {
    response({
        'req.session': request.session,
        'req.use': request.user, 
        'req._passport': request._passport
    });
});

app.get('/login', (request, response) => {
    response.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.post('/login', passport.authenticate('local'), (request, response) => {
    response.send('로그인 성공');
})


app.get('/logout', (req, res) => {
    req.logout();
    res.send('로그아웃 성공');
});


app.get('profile', (req, res) => {
    res.json(req.user);
});

app.get('*', (_, res) => res.send('passport test'));

app.listen(3000, () => console.log('listening on 3000'));










