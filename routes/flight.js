const express = require('express');
const { flightAdd, flightView } = require('../controllers/flightController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/flight', verifyUser(['user','admin']), flightView)
router.post('/flight', verifyUser(['user','admin']), flightAdd)

module.exports = router;
