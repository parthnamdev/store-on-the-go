const express = require('express');
const router =  express.Router();

const sellerController = require('../controllers/sellerController')

router.get('/', sellerController.index);
router.get('/transactions', sellerController.transactions);
router.get('/profile', sellerController.profile);

module.exports = router;