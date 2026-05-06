const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getCategories);
router.post('/', auth, admin, createCategory);
router.put('/:id', auth, admin, updateCategory);
router.delete('/:id', auth, admin, deleteCategory);

module.exports = router;
