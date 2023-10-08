//Entry point
const bodyParser = require('body-parser');
const mongodb = require('./database/database.js');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
app.use(cors({methods: ['GET','DELETE','UPDATE','PUT','PATCH']}))
app.use(cors({origin: '*'}))
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL   
},
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}` + `Origin: ${origin}`);
})
    

const port = process.env.PORT || 3000;


mongodb.initiateDb((error) => {
    if(error) {
        console.log(error.name);
        console.log(error.message);
    } else {
        app.listen(port, console.log(`Server is listening at the port ${port}`));
    }
 
})




