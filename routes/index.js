const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGeust } = require('../helpers/auth');
router.get('/', ensureGeust, (req, res) => {
    res.render('index/welcom');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;