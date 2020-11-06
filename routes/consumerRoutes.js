const express = require('express');
const router =  express.Router();

const consumerController = require('../controllers/consumerController');
const authenticate = require('../middleware/authenticate');


router.get('/location', authenticate, consumerController.location);
router.get('/cart', authenticate, consumerController.cart);
router.get('/profile', authenticate, consumerController.profile);
router.get('/:city', authenticate, consumerController.index);

module.exports = router;