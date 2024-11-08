const express = require('express');
const { supportView, contactSend } = require('../controllers/supportController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/support', verifyUser(['user','admin']), supportView)
router.post('/support', verifyUser(['user','admin']), contactSend)

module.exports = router;
