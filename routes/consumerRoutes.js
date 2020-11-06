const express = require('express');
const router =  express.Router();

const consumerController = require('../controllers/consumerController');
const authenticate = require('../middleware/authenticate');


router.get('/location', authenticate, consumerController.location);
router.get('/cart', authenticate, consumerController.cart);
router.get('/profile', authenticate, consumerController.profile);
router.get('/', authenticate, consumerController.index);
router.post('/changeLocation', authenticate, consumerController.changeLocation);
router.post('/deleteAddress', authenticate, consumerController.deleteAddress);
router.post('/addAddress', authenticate, consumerController.addAddress);
router.post('/addToCart', authenticate, consumerController.addToCart);
router.post('/cartQuantity', authenticate, consumerController.cartQuantity);
router.post('/checkOut', authenticate, consumerController.checkOut);
router.post('/', authenticate, consumerController.searchProducts);
router.post('/delete', authenticate, consumerController.deleteUser);
router.get('/successTransaction', authenticate, consumerController.successTransaction);
router.get('/:id', authenticate, consumerController.findProductById);

module.exports = router;