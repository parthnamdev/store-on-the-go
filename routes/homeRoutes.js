const express = require('express');
const router =  express.Router();

const homeController = require('../controllers/homeController');
const authenticate = require('../middleware/authenticate');

router.get('/', homeController.index);
router.get('/login', homeController.loginPage);
router.get('/signup', homeController.signupPage);
router.get('/logout', homeController.logout);
router.post('/explore', homeController.explore);
router.post('/signup', homeController.register);
router.post('/login', homeController.login);
router.post('/search', homeController.search);
router.get('/suggestion/:city/:input', homeController.suggest);

// router.get('/consumer', authenticate, homeController.consumer);
// router.get('/consumerCart', authenticate, homeController.consumerCart);
// router.get('/consumerLocation', authenticate, homeController.consumerLocation);
// router.get('/consumerProfile', authenticate, homeController.consumerProfile);

module.exports = router;