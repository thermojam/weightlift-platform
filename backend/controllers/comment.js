const mongoose = require('mongoose');
const Comment = require('../models/Comment');

async function addComment(postId, comment) {
    const Post = mongoose.model('Post');

    const newComment = await Comment.create(comment);

    await Post.findByIdAndUpdate(postId, {$push: {comments: newComment}});

    await newComment.populate('author');

    return newComment;
}

async function deleteComment(postId, commentId) {
    const Post = mongoose.model('Post');

    await Comment.deleteOne({_id: commentId});

    await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}});
}

module.exports = {
    addComment,
    deleteComment
};
