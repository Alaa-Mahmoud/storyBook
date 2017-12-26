const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGeust } = require('../helpers/auth');
const Story = require('../models/story');

// story index
router.get('/', (req, res) => {
    Story.find({ status: 'public' }).populate('user').sort({ date: 'desc' }).then((stories) => {
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
        allowComment: allowComments,
        user: req.user.id,
    };
    new Story(newStory).save().then((story) => {
        res.redirect(`/stories/show/${story.id}`);
    });
});


//show single story
router.get('/show/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).populate('user').populate('comments.commentUser').then((story) => {
        res.render('stories/show', { story: story });
    });
});

//edit story form
router.get('/edit/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).then((story) => {
        // control that only story's user have to edit it's own story only 
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', { story: story });
        }
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
        story.allowComment = req.body.allowComments;

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

//add comment

router.post('/comment/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).then((story) => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        };
        // push to comments arry to the top 
        story.comments.unshift(newComment);
        story.save().then((newStory) => {
            res.redirect(`/stories/show/${newStory.id}`);
        });
    });
});




module.exports = router;