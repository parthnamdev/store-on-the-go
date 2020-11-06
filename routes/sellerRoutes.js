const express = require('express');
const router =  express.Router();

const sellerController = require('../controllers/sellerController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, sellerController.index);
router.get('/transactions', authenticate, sellerController.transactions);
router.get('/profile', authenticate, sellerController.profile);
router.get('/newProduct', sellerController.newProduct);
router.post('/addProduct', sellerController.addProduct);

module.exports = router;