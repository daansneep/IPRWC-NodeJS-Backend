const db = require('../database/db');

module.exports = class AuthDAO {
    static registerUser(email, password, admin) {
        return db.query(`INSERT INTO account (accountnumber, email, password, isadmin) VALUES (DEFAULT, '${email}',
                                                                      '${password}', '${admin}');`);
    }

    static getAccountByEmail(email) {
        return db.query(`SELECT email, password, isadmin FROM account WHERE email = '${email}';`);
    }
}
