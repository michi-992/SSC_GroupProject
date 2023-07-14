const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');

// Function to get all users
let getUsers = () => new Promise((resolve, reject) => {
    const sql = `SELECT users.*, users_nation.nation
             FROM users
             LEFT JOIN users_nation ON users.id = users_nation.userID
             ORDER BY users.id`;
    db.query(sql, function (err, users, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            resolve(users); // Resolve with users data if query succeeds
        }
    });
});

// Function to get a single user by ID
let getUser = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT users.*, users_nation.nation FROM users LEFT JOIN users_nation ON users.id = users_nation.userID WHERE users.id = ?';
    db.query(sql, [id], function (err, users, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            resolve(users[0]); // Resolve with the first user data if query succeeds
        }
    });
});

// Function to update a user's data
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
    sql += "WHERE id = " + id;
    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        resolve(userData); // Resolve with the updated user data if query succeeds
    });
});

// Function to create a new user
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
            reject(err); // Reject with error if query fails
        }
        const userId = result.insertId;
        userData.id = userId;
        resolve(userData); // Resolve with the created user data
    });
});

// Function to delete a user by ID
let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id=?', [id], function (err, result) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        resolve(id); // Resolve with the deleted user ID
    });
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
};