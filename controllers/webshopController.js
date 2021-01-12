const webshopDao = require('../dao/webshopDAO');

exports.getProducts = (req, res, next) => {
    webshopDao.getProducts()
        .then(products => {
            res.status(200).json({
                message: 'Got all products succesfully!',
                products: products.rows
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.getCategories = (req, res, next) => {
    webshopDao.getCategories()
        .then(categories => {
            res.status(200).json({
                message: 'Got all categories succesfully!',
                categories: categories.rows
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.getProductById = (req, res, next) => {
    webshopDao.getProductById(req.params.id)
        .then(product => {
            res.status(200).json({
                message: 'Got product by id succesfully!',
                product: product.rows[0]
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.getCategoryById = (req, res, next) => {
    webshopDao.getCategoryById(req.params.id)
        .then(category => {
            res.status(200).json({
                message: 'Got category by id succesfully!',
                category: category.rows[0]
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.getProductsFromCategory = (req, res, next) => {
    webshopDao.getProductsFromCategory(req.params.id)
        .then(products => {
            res.status(200).json({
                message: 'Got all products from passed category id succesfully!',
                products: products.rows
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.createProduct = (req, res, next) => {
    webshopDao.createProduct(req.body)
        .then((metadata) => {
            res.status(200).json({
                id: metadata.rows[0].productnumber,
                message: 'Created product succesfully!'
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.createCategory = (req, res, next) => {
    webshopDao.createCategory(req.body).metadata
        .then(metadata => {
            res.status(200).json({
                id: metadata.rows[0].categorynumber,
                message: 'Created category succesfully!'
            });
        })
        .catch(error => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.updateProduct = (req, res, next) => {
    webshopDao.updateProduct(req.body)
        .then(() => {
            res.status(200).json({
                message: 'Updated product succesfully!'
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.updateCategory = (req, res, next) => {
    webshopDao.getCategoryById(req.body.categorynumber)
        .then(category => {
            webshopDao.updateCategory(category.rows[0].categoryname, req.body.categoryname, req.body.categorynumber)
                .then(() => {
                    res.status(200).json({
                        message: 'Updated category succesfully!'
                    });
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.deleteProduct = (req, res, next) => {
    webshopDao.deleteProduct(req.params.id)
        .then(() => {
           res.status(200).json({
               message: 'Deleted product succesfully!'
           })
        })
        .catch(error => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.deleteCategory = (req, res, next) => {
    webshopDao.getProductsFromCategory(req.params.id)
        .then(products => {
            if (products.length < 1) {
                webshopDao.deleteCategory(req.params.id)
                    .then(() => {
                        res.status(200).json({
                            message: 'Deleted product succesfully!'
                        })
                    })
                    .catch(error => {
                        if(!error.statusCode) {
                            error.statusCode = 500;
                        }
                        next(error);
                    });
            } else {
                res.status(500).json({
                    message: 'Not allowed, category still has products!'
                })
            }
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
        })

}
