const express = require('express');
const router = express.Router();
const { login, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Private routes
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

module.exports = router;