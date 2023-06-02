const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');

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

let updateUser = (userData) => new Promise(async (resolve, reject) => {
    let sql = "UPDATE users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", comfortCharacter = " + db.escape(userData.comfortCharacter) +
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

let createUser = (userData) => new Promise(async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    const sql = "INSERT INTO users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", comfortCharacter = " + db.escape(userData.hero) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info) +
        ", role = " + db.escape("user") +
        ", password = " + db.escape(userData.password);

    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
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

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}