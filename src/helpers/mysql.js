/**
 * @Created by MinJa 
 * on 12/03/2020.
 */

const database = require('../database/db');

let self = {
    queryRunner: function (data, callback) {
        var query = data.query;
        var insert_data = data.insert_data;
        database.getConnection(function (err, con) {
            if (err) {
                console.log("--- mysql error ---");
                con.release();
            } else {
                database.query(String(query), insert_data, function (err, rows) {
                    con.release();
                    if (!err) {
                        callback(rows);
                    } else {
                        console.log("--- mysql error ---");
                        console.log(err);
                        console.log("Query failed");
                    }
                });
            }
        });
    }
}

module.exports = self;