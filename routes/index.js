const express = require('express');
const router = express.Router();
const Story = require('../models/story');
const { ensureAuthenticated, ensureGeust } = require('../helpers/auth');

// home page
router.get('/', ensureGeust, (req, res) => {
    res.render('index/welcom');
});

// user dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {

    Story.find({ user: req.user.id }).then((stories) => {
        res.render('index/dashboard', { stories: stories });
    });

});

// about page
router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;