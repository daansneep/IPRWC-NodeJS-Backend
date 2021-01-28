const db = require('../database/db');

module.exports = class ProfileDAO {
    static getUserData(accountnumber) {
        return db.query(`SELECT * FROM account WHERE accountnumber = $1`, [accountnumber]);
    }

    static postUserData(accountnumber, body) {
        const { postalcode, streetname, housenumber, addition, city } = body;
        return db.query(`UPDATE account SET (postalcode, streetname, housenumber, addition, city) = (
                                                                    $1, $2, $3, $4, $5) WHERE accountnumber = $6`,
            [postalcode, streetname, housenumber, addition, city, accountnumber]);
    }
}
