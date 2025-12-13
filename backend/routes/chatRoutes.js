const express = require('express');
const router = express.Router();
const {
  testGeminiAPI,
  sendChatMessage,
  getChatHistory,
  getChatStats
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/test', testGeminiAPI);
router.post('/', sendChatMessage);
router.get('/:sessionId', getChatHistory);

// Private routes (admin only)
router.get('/admin/stats', protect, getChatStats);

module.exports = router;