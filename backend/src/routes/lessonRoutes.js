const express = require('express');
const router = express.Router();
const { createLesson, getLessons, getLesson } = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createLesson);
router.get('/', protect, getLessons);
router.get('/:id', protect, getLesson);

module.exports = router;