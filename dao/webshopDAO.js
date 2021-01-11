const db = require('../database/db');

module.exports = class WebshopDAO {
    static getProducts() {
        return db.query(`SELECT * FROM product`);
    }

    static getCategories() {
        return db.query(`SELECT * FROM categorie`);
    }

    static getProductById(productId) {
        return db.query(`SELECT * FROM product WHERE productnummer=${productId};`);
    }

    static getCategoryById(categoryId) {
        return db.query(`SELECT * FROM categorie WHERE categorienummer=${categoryId}`);
    }

    static getProductsFromCategory(categoryId) {
        return db.query(`SELECT * FROM product WHERE categorienummer=${categoryId}`);
    }

    static createProduct(body) {
        const { titel, beschrijving, afbeelding, categorienummer, inkoopprijs, verkoopprijs, voorraad, marge_percentage,
            laat_zien_in_webshop } = body;

        console.log(marge_percentage);

        return db.query(`INSERT INTO product VALUES (DEFAULT, '${titel}', '${beschrijving}',
                     '${afbeelding}', ${categorienummer}, ${inkoopprijs}, ${verkoopprijs}, ${voorraad}, 
                     ${marge_percentage}, ${laat_zien_in_webshop}) RETURNING productnummer;`);
    }

    static createCategory(body) {
        const { categorienaam } = body;

        return {
            metadata: db.query(`INSERT INTO categorie VALUES (DEFAULT, '${categorienaam}') RETURNING categorienummer;;`),
            new_table: db.query(`CREATE TABLE ${categorienaam}(productnummer INTEGER PRIMARY KEY);`)
        };
    }

    static updateProduct(body) {
        const { productnummer, titel, beschrijving, afbeelding, categorienummer, inkoopprijs, verkoopprijs, voorraad, marge_percentage,
            laat_zien_in_webshop } = body;

        return db.query(`UPDATE product SET (titel, beschrijving, afbeelding, categorienummer, inkoopprijs, 
                     verkoopprijs, voorraad, marge_percentage, laat_zien_in_webshop) = ('${titel}', '${beschrijving}',
                     '${afbeelding}', ${categorienummer}, ${inkoopprijs}, ${verkoopprijs}, ${voorraad}, 
                     ${marge_percentage}, ${laat_zien_in_webshop}) WHERE productnummer = ${productnummer};`);
    }

    static updateCategory(categorienaam_old, categorienaam, categorienummer) {
        return db.query(`UPDATE categorie SET (categorienaam) = ROW('${categorienaam}') WHERE categorienummer = ${categorienummer};`)
            .then(() => {
                return db.query(`ALTER TABLE ${categorienaam_old} RENAME TO ${categorienaam};`);
            });
    };

    static deleteProduct(productId) {
        return db.query(`DELETE FROM product WHERE productnummer=${productId}`);
    }

    static deleteCategory(categoryId) {
    }
}
