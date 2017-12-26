const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
// Load User Model
require('./models/user');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const story = require('./routes/story');
// Load Keys
const keys = require('./config/keys');

// handlebars helpers
const { trancate, stripTags, formatDate, select, editIcon } = require('./helpers/hbs');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
        useMongoClient: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// method override 
app.use(methodOverride('_method'));


// Handlebars Middleware
app.engine('handlebars', exphbs({
    helpers: {
        trancate: trancate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon,
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// set static folders 

app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', story);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});