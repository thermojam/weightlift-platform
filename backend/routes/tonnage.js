const express = require('express');
const router = express.Router();
const { addTonnage, getTonnage } = require('../controllers/tonnageController');
const authenticated = require('../middlewares/authenticated');


router.post('/', authenticated, addTonnage);
router.get('/', authenticated, getTonnage);

module.exports = router;
