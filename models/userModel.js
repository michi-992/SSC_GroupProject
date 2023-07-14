const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');


let getUsers = () => new Promise((resolve, reject) => {
    const sql = `SELECT users.*, users_nation.nation
             FROM users
             LEFT JOIN users_nation ON users.id = users_nation.userID
             ORDER BY users.id`;
    db.query(sql, function (err, users, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(users)
        }
    })
})

let getUser = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT users.*, users_nation.nation, user_pictures.profilePicture FROM users LEFT JOIN users_nation ON users.id = users_nation.userID LEFT JOIN user_pictures ON users.id = user_pictures.userID WHERE users.id = ?';

    db.query(sql, [id], function (err, users, fields) {
        if (err) {
            reject(err)
        }
        console.log(users[0]);
        resolve(users[0]);
    })
});

let updateUser = (userData, id) => new Promise(async (resolve, reject) => {
    let sql = "UPDATE users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", username = " + db.escape(userData.username) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info);

    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
        sql += ", password = " + db.escape(userData.password);
    }
    console.log(id);
    sql += "WHERE id = " + id;

    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        }
        resolve(userData);
    })
})


let createUser = (userData) => new Promise(async (resolve, reject) => {
    userData.password = await bcrypt.hash(userData.password, 10);
    const sql = "INSERT INTO users SET " +
        "name = " + db.escape(userData.name) +
        ", surname = " + db.escape(userData.surname) +
        ", username = " + db.escape(userData.username) +
        ", email = " + db.escape(userData.email) +
        ", info = " + db.escape(userData.info) +
        ", role = " + db.escape("user") +
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

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}