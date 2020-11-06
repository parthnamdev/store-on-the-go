const express = require('express');
const router =  express.Router();

const sellerController = require('../controllers/sellerController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

router.get('/', authenticate, sellerController.index);
router.get('/transactions', authenticate, sellerController.transactions);
router.get('/profile', authenticate, sellerController.profile);
router.get('/newProduct', authenticate, sellerController.newProduct);
router.post('/addProduct', [ authenticate, upload ], sellerController.addProduct);
router.post('/editProduct', authenticate, sellerController.editProduct);
router.post('/editProductImage', [ authenticate, upload ], sellerController.editProductImage);
router.post('/deleteProduct', authenticate, sellerController.deleteProduct);
router.post('/delete', authenticate, sellerController.deleteUser);
router.get('/:id', authenticate, sellerController.findProductById);

module.exports = router;