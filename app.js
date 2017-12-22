const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('it works');
});

// passport config 
require('./config/passport')(passport);

// here to load routes
const auth = require('./routes/auth');


// here to put middleware
app.use('/auth', auth);







app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});