const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGeust } = require('../helpers/auth');
const Story = require('../models/story');

// story index
router.get('/', (req, res) => {
    Story.find({ status: 'public' }).populate('user').then((stories) => {
        res.render('stories/index', { stories: stories });
    });

});

// add story form 
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// add story to DB
router.post('/', (req, res) => {
    let allowComments;
    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id,
    };
    new Story(newStory).save().then((story) => {
        res.redirect(`/stories/show/${story.id}`);
    });
});


//show single story
router.get('/show/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).populate('user').then((story) => {
        res.render('stories/show', { story: story });
    });
});

//edit story form
router.get('/edit/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).then((story) => {
        res.render('stories/edit', { story: story });
    });

});

// edit form process 
router.put('/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).then((story) => {
        let allowComments;
        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        // new values
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = req.body.allowComments;

        story.save().then(newStory => {
            res.redirect('/dashboard');
        });

    });
});

router.delete('/:id', (req, res) => {
    Story.remove({ _id: req.params.id }).then(() => {
        res.redirect('/dashboard');
    });

});


module.exports = router;