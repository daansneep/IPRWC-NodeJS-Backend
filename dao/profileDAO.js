const db = require('../database/db');

module.exports = class ProfileDAO {
    static getUserData(accountnumber) {
        return db.query(`SELECT * FROM account WHERE accountnumber = ${accountnumber}`);
    }

    static postUserData(accountnumber, body) {
        const { postalcode, streetname, housenumber, addition, city } = body;
        if(body.addition === null) {
            return db.query(`UPDATE account SET (postalcode, streetname, housenumber, addition, city) = (
                                                                        '${postalcode}', '${streetname}', 
                                                                        '${housenumber}', ${addition},'${city}')
                                                                        WHERE accountnumber = ${accountnumber}`)
        } else {
            return db.query(`UPDATE account SET (postalcode, streetname, housenumber, addition, city) = (
                                                                        '${postalcode}', '${streetname}', 
                                                                        '${housenumber}', '${addition}','${city}')
                                                                        WHERE accountnumber = ${accountnumber}`)
        }
    }
}
