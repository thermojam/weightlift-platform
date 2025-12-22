const express = require('express');
const { createFeedback, getFeedbacks, deleteFeedback } = require('../controllers/feedback');
const { validateFeedback } = require('../middlewares/validation');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.post('/', validateFeedback, async (req, res, next) => {
    try {
        const feedback = await createFeedback(req.body);
        res.status(201).send({ data: feedback, error: null });
    } catch (e) {
        next(e);
    }
});

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const feedbacks = await getFeedbacks();
        res.send({ data: feedbacks, error: null });
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const result = await deleteFeedback(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Feedback not found' });
        }
        res.send({ error: null });
    } catch (e) {
        next(e);
    }
});

module.exports = router;

