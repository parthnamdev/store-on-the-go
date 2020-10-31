const express = require('express');
const router =  express.Router();

const homeController = require('../controllers/homeController')

router.get('/', homeController.index);
router.get('/login', homeController.login);
router.get('/signup', homeController.signup);
router.post('/explore', homeController.explore);

module.exports = router;