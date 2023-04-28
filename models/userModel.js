const db = require('../services/database.js').config;

// function getUsers(cb) {
//     db.query("SELECT * FROM users", function (err, users, fields) {
//         if (err) { cb(err) }
//         console.log(users);
//         cb(null, users)
//     });
// }

let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", function (err, users, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(users)
        }
    })
})

// function getUser(id) {
//     let user = users.find(element => element.id === parseInt(id))
//     if(typeof user !== "undefined") {
//         return user;
//     } else {
//         console.log("error");
//         return 'Error 404: This user could not be found.'
//     }
// }

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
        ", password = " + db.escape(userData.password) +
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
        ", info = " + db.escape(userData.info) +
        ", password = " + db.escape(userData.password);

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