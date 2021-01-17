const db = require('../database/db');

module.exports = class AuthDAO {
    static registerUser(email, password, admin) {
        return db.query(`INSERT INTO account (accountnumber, email, password, isadmin) VALUES (DEFAULT, '${email}',
                                                                      '${password}', '${admin}');`);
    }

    static getAccountByEmail(email) {
        return db.query(`SELECT accountnumber, email, password, isadmin FROM account WHERE email = '${email}';`);
    }

    static getIsAdmin(accountnumber) {
        console.log('getting is admin')
        return db.query(`SELECT isadmin FROM account WHERE accountnumber = ${accountnumber};`)
    }
}
