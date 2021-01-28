const db = require('../database/db');

module.exports = class WebshopDAO {
    static getProducts() {
        return db.query(`SELECT * FROM product`);
    }

    static getCategories() {
        return db.query(`SELECT * FROM category`);
    }

    static getProductById(productId) {
        return db.query(`SELECT * FROM product WHERE productnumber=$1;`, [productId]);
    }

    static getCategoryById(categoryId) {
        return db.query(`SELECT * FROM category WHERE categorynumber=$1;`, [categoryId]);
    }

    static getProductsFromCategory(categoryId) {
        return db.query(`SELECT * FROM product WHERE categorynumber=$1;`, [categoryId]);
    }

    static createProduct(body) {
        const { title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin,
            showinwebshop } = body;

        return db.query(`INSERT INTO product (productnumber, title, description, imagepath, categorynumber, 
                     purchaseprice, saleprice, stock, margin, showinwebshop) VALUES (DEFAULT, $1, 
                     $2, $3, $4, $5, $6, $7, $8, $9);`, [title, description, imagepath, categorynumber,
        purchaseprice, saleprice, stock, margin, showinwebshop]);
    }

    static createCategory(body) {
        const { categoryname, previouscategorynumber } = body;

        return db.query(`INSERT INTO category (categorynumber, categoryname, previouscategorynumber) VALUES 
                                                    (DEFAULT, $1, $2);`, [categoryname, previouscategorynumber]);
    }

    static updateProduct(body) {
        const { productnumber, title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin,
            showinwebshop } = body;

        return db.query(`UPDATE product SET title = $1, description = $2, 
                 imagepath = $3, categorynumber = $4, purchaseprice = $5, 
                 saleprice = $6, stock = $7, margin = $8, showinwebshop = $9
                 WHERE productnumber = $10;`, [title, description, imagepath, categorynumber, purchaseprice,
            saleprice, stock, margin, showinwebshop, productnumber]);
    }

    static updateCategory(categorynumber, categoryname, previouscategorynumber) {
        return db.query(`UPDATE category SET (categoryname, previouscategorynumber) = ROW($1, 
                $2) WHERE categorynumber = $3;`, [categoryname, previouscategorynumber, categorynumber]);
    };

    static deleteProduct(productId) {
        return db.query(`DELETE FROM product WHERE productnumber=$1;`, [productId]);
    }

    static deleteCategory(categoryId) {
        return db.query(`DELETE FROM category WHERE categorynumber=$1;`, [categoryId])
    }
}
