const db = require('../services/database.js').config;

let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", function (err, users, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(users)
        }
    })
})


let getUser = (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id=?', [id], function (err, users, fields) {
        if (err) {
            reject(err)
        }
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
        "WHERE id = " + parseInt(userData.id);

    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        }
        resolve(userData);
    })
})

let addUser = () => new Promise((resolve, reject) => {
//exist for now
})

let createUser = (userData) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", hero = " + db.escape(userData.hero) +
        ", email = " + db.escape(userData.email) +
        ", password = " + db.escape(userData.password) +
        ", info = " + db.escape(userData.info);

    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err);
        }
        const userId = result.insertId;
        userData.id = userId;
        resolve(userData);
    })
})

let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id=?', [id], function (err, result) {
        if (err) {
            reject(err)
        }
        resolve(id);
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
    createUser,
    deleteUser
}