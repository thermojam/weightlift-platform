const express = require('express');
const { getUsers, deleteUser, updateUser, getRoles } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const users = await getUsers();
        res.send({ data: users.map(mapUser) });
    } catch (e) {
        next(e);
    }
});

router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const roles = getRoles();
        res.send({ data: roles });
    } catch (e) {
        next(e);
    }
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const { role } = req.body;
        const updatedUser = await updateUser(req.params.id, { role });

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ data: mapUser(updatedUser) });
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res, next) => {
    try {
        const result = await deleteUser(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ error: null });
    } catch (e) {
        next(e);
    }
});

module.exports = router;

