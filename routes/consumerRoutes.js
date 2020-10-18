const express = require('express');
const router =  express.Router();

const consumerController = require('../controllers/consumerController')

router.get('/', consumerController.index);
router.get('/location', consumerController.location);
router.get('/cart', consumerController.cart);
router.get('/profile', consumerController.profile);

module.exports = router;