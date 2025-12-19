const FeedbackForm = require('../models/FeedbackForm');

async function createFeedback(feedbackData) {
    const feedback = await FeedbackForm.create(feedbackData);
    return feedback;
}

async function getFeedbacks() {
    return FeedbackForm.find().sort({ createdAt: -1 });
}

async function deleteFeedback(id) {
    return FeedbackForm.deleteOne({ _id: id });
}

module.exports = {
    createFeedback,
    getFeedbacks,
    deleteFeedback,
};

