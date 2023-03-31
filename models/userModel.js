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

const members = [
    {
        name: "Noëlle Jamöck",
        age: 20,
        codingExperience: "1 year",
        catchphrase: "'Eh, she's just being dramatic.'",
    },
    {
        name: "Caroline Mandl",
        age: 19,
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
    members
}