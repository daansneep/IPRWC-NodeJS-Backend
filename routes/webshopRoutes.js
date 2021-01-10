const express = require('express')

const webshopController = require('../controllers/WebshopController')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /products
// Get all products
router.get('/products')

// GET /categories
// Get all categories
router.get('/categories')

// GET /product/:id
// Get a product by its id
router.get('/product/:id')

// GET /category/:id
// Get this category and all its subcategories
router.get('/category/:id')

// GET /category/:id/products
// Get all products from a category and its subcategories
router.get('category/:id/products')

// POST /product/create
// Create one product
router.post('/product/create', isAuth)

// POST /category/create
// Create a category
router.post('/category/create', isAuth)

// PUT /product/update
// Update a product
router.put('/product/update', isAuth)

// PUT /category/update
// Update a category
router.put('category/update', isAuth)

// DELETE /product/delete
// Delete a product
router.delete('/product/delete', isAuth)

// DELETE /category/delete
// Delete a category
router.delete('category/delete', isAuth)

module.exports = router;
