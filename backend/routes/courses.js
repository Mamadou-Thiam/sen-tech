const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', auth, admin, createCourse);
router.put('/:id', auth, admin, updateCourse);
router.delete('/:id', auth, admin, deleteCourse);

module.exports = router;
