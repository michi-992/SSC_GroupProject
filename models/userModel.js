const db = require('../services/database.js').config;

let getUsers = () => new Promise ((resolve, reject) => {
    db.query('SELECT * FROM users', function (err, users, fields) {
        if (err) {reject(err)}
        console.log(users);
        resolve(users);
    })
});

let getUser = (id) => new Promise ((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=?', [id], function (err, users, fields) {
        if (err) {reject(err)}
        console.log(users);
        resolve(users[0]);
    })
});

let updateUser = (userData) => new Promise((resolve, reject) => {
    let sql = "UPDATE users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", hero = " + db.escape(userData.hero) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info) +
        " WHERE id = " + parseInt(userData.id);

    console.log(sql);

    db.query(sql, function (err, result) {
        if (err) {
            reject(err);
        }
        console.log(result);
        console.log(result.affectedRows + " row(s) has/have been affected.");
        resolve(userData);
    })
});

const members = [
    {
        name: "Noëlle Jamöck",
        age: 20,
        codingExperience: "1 year",
        catchphrase: "'Eh, she's just being dramatic.'",
    },
    {
        name: "Caroline Mandl",
        age: 20,
        codingExperience: "4 years",
        catchphrase: "'CMD called me a general failure. Ouch.'",
    },
    {
        name: "Michaela Topalovic",
        age: 20,
        codingExperience: "1 semester",
        catchphrase: "'As creative as this quote.'",
    }
]

module.exports = {
    getUsers,
    getUser,
    members,
    updateUser,
}