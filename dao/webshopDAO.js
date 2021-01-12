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

        return db.query(`INSERT INTO product VALUES (DEFAULT, '${title}', '${description}', '${imagepath}',
                            ${categorynumber}, ${purchaseprice}, ${saleprice}, ${stock}, ${margin}, ${showinwebshop}) 
                            RETURNING productnumber;`);
    }

    static createCategory(body) {
        const { categoryname } = body;

        return {
            metadata: db.query(`INSERT INTO category VALUES (DEFAULT, '${categoryname}') RETURNING categorynumber;;`),
            new_table: db.query(`CREATE TABLE ${categoryname}(productnumber INTEGER PRIMARY KEY);`)
        };
    }

    static updateProduct(body) {
        const { productnumber, title, description, imagepath, categorynumber, purchaseprice, saleprice, stock, margin,
            showinwebshop } = body;

        return db.query(`UPDATE product SET (title, description, imagepath, categorynumber, purchaseprice, 
                     saleprice, stock, margin, showinwebshop) = ('${title}', '${description}',
                     '${imagepath}', ${categorynumber}, ${purchaseprice}, ${saleprice}, ${stock}, 
                     ${margin}, ${showinwebshop}) WHERE productnumber = ${productnumber};`);
    }

    static updateCategory(categoryname_old, categoryname, categorynumber) {
        return db.query(`UPDATE category SET (categoryname) = ROW('${categoryname}') WHERE categorynumber = ${categorynumber};`)
            .then(() => {
                return db.query(`ALTER TABLE ${categoryname_old} RENAME TO ${categoryname};`);
            });
    };

    static deleteProduct(productId) {
        return db.query(`DELETE FROM product WHERE productnumber=${productId}`);
    }

    static deleteCategory(categoryId) {
        return db.query(`DELETE FROM category WHERE categorynumber=${categoryId}`)
    }
}
