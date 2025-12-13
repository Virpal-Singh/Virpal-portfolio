const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessage,
  toggleReadStatus,
  deleteMessage,
  getMessageStats
} = require('../controllers/messageController');

// Public routes
router.post('/', createMessage);

// Private routes (require authentication)
const { protect } = require('../middleware/auth');

router.get('/', protect, getMessages);
router.get('/stats', protect, getMessageStats);
router.get('/:id', protect, getMessage);
router.patch('/:id/read', protect, toggleReadStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;