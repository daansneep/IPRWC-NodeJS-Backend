const db = require('../database/db');

module.exports = class AuthDAO {
    static registerUser(email, password, admin) {
        return db.query(`INSERT INTO account (accountnumber, email, password, isadmin) 
                                                    VALUES (DEFAULT, $1, $2, $3);`, [email, password, admin]);
    }

    static getAccountByEmail(email) {
        return db.query(`SELECT accountnumber, email, password, isadmin FROM account WHERE email = $1;`, [email]);
    }

    static getIsAdmin(accountnumber) {
        return db.query(`SELECT isadmin FROM account WHERE accountnumber = $1;`, [accountnumber])
    }

    static getUsers() {
        return db.query(`SELECT accountnumber, email, isadmin FROM account;`);
    }

    static deleteUser(id) {
        return db.query(`DELETE FROM account WHERE accountnumber = $1;`, [id])
    }
}
