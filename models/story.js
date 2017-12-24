const mongoose = require('mongoose');
const Schema = mongoose.Schema;

StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComment: {
        type: Boolean,
        default: true,
    },
    comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: Schema.ObjectId,
            ref: 'Users'
        }
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Strories', StorySchema, 'stories');