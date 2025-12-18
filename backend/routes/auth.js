const express = require('express')
const { register, login } = require('../controllers/user')
const mapUser = require('../helpers/mapUser')
const authenticated = require('../middlewares/authenticated')

const router = express.Router({ mergeParams: true })

router.post('/register',  async (req, res, next) => {
    try {
        const {user, token} = await register(req.body.login, req.body.password);

        res.cookie('token', token, {httpOnly: true})
            .send({error: null, user: mapUser(user)});
    } catch (e) {
        next(e);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const {user, token} = await login(req.body.login, req.body.password);

        res.cookie('token', token, {httpOnly: true})
            .send({error: null, user: mapUser(user)});

    } catch (e) {
        next(e);
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', '', {httpOnly: true})
        .send({});
})

router.get('/me', authenticated, (req, res, next) => {
    try {
        res.send({ user: mapUser(req.user) });
    } catch (e) {
        next(e);
    }
})

module.exports = router;
