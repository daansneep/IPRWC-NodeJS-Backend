const express = require('express')

const webshopController = require('../controllers/WebshopController')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /products
// Get all products
router.get('/products', webshopController.getProducts)

// GET /categories
// Get all categories
router.get('/categories', webshopController.getCategories)

// GET /product/:id
// Get a product by its id
router.get('/product/:id', webshopController.getProductById)

// GET /category/:id
// Get this category and all its subcategories
router.get('/category/:id', webshopController.getCategoryById)

// GET /category/:id/products
// Get all products from a category and its subcategories
router.get('category/:id/products', webshopController.getProductsFromCategory)

// POST /product/create
// Create one product
router.post('/product/create', isAuth, webshopController.createProduct)

// POST /category/create
// Create a category
router.post('/category/create', isAuth, webshopController.createCategory)

// PUT /product/update
// Update a product
router.put('/product/update', isAuth, webshopController.updateProduct)

// PUT /category/update
// Update a category
router.put('/category/update', isAuth, webshopController.updateCategory)

// DELETE /product/delete
// Delete a product
router.delete('/product/delete/:id', isAuth, webshopController.deleteProduct)

// DELETE /category/delete
// Delete a category
router.delete('/category/delete/:id', isAuth, webshopController.deleteCategory)

module.exports = router;
