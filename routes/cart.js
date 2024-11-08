const express = require('express');
const { myCartView, myCartCreate, myCartDelete, myCartCheckout } = require('../controllers/cartController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/mycart', verifyUser(['user','admin']), myCartView);
router.post('/mycart', verifyUser(['user','admin']), myCartCreate);
router.post('/mycart/delete', verifyUser(['user','admin']), myCartDelete);
router.post('/mycart/checkout', verifyUser(['user','admin']), myCartCheckout);

module.exports = router;
