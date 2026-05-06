const express = require('express');
const router = express.Router();
const { getEnrollments, getMyEnrollments, createEnrollment, extendEnrollment, deleteEnrollment } = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, admin, getEnrollments);
router.get('/my-enrollments', auth, getMyEnrollments);
router.post('/', auth, admin, createEnrollment);
router.put('/extend/:id', auth, admin, extendEnrollment);
router.delete('/:id', auth, admin, deleteEnrollment);

module.exports = router;
