const db = require('../database/db');

module.exports = class WebshopDAO {
    static getProducts() {
        return db.query(`SELECT * FROM product`);
    }

    static getCategories() {
        return db.query(`SELECT * FROM category`);
    }

    static getProductById(productId) {
        return db.query(`SELECT * FROM product WHERE productnumber=${productId};`);
    }

    static getCategoryById(categoryId) {
        return db.query(`SELECT * FROM category WHERE categorynumber=${categoryId}`);
    }

    static getProductsFromCategory(categoryId) {
        return db.query(`SELECT * FROM product WHERE categorynumber=${categoryId}`);
    }

    static createProduct(body) {
        const { title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin,
            showinwebshop } = body;
        console.log(body);

        return db.query(`INSERT INTO product (productnumber, title, description, imagepath, categorynumber, 
                     purchaseprice, saleprice, stock, margin, showinwebshop) VALUES (DEFAULT, '${title}', 
                     '${description}', '${imagepath}', ${categorynumber}, ${purchaseprice}, ${saleprice}, ${stock}, 
                                                                                     ${margin}, ${showinwebshop});`);
    }

    static createCategory(body) {
        const { categoryname, previouscategorynumber } = body;

        return db.query(`INSERT INTO category VALUES (DEFAULT, '${categoryname}', ${previouscategorynumber}) 
                RETURNING categorynumber;`);
    }

    static updateProduct(body) {
        const { productnumber, title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin,
            showinwebshop } = body;

        return db.query(`UPDATE product SET title = '${title}', description = '${description}', 
                 imagepath = '${imagepath}', categorynumber = ${categorynumber}, purchaseprice = ${purchaseprice}, 
                 saleprice = ${saleprice}, stock = ${stock}, margin = ${margin}, showinwebshop = ${showinwebshop}
                 WHERE productnumber = ${productnumber};`);
    }

    static updateCategory(categoryname, categorynumber) {
        return db.query(`UPDATE category SET (categoryname, previouscategorynubmer) = ROW('${categoryname}', 
                '${previouscategorynubmer}') WHERE categorynumber = ${categorynumber};`);
    };

    static deleteProduct(productId) {
        return db.query(`DELETE FROM product WHERE productnumber=${productId}`);
    }

    static deleteCategory(categoryId) {
        return db.query(`DELETE FROM category WHERE categorynumber=${categoryId} CASCADE`)
    }
}
