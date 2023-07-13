const db = require('../services/database.js').config;

function getCharacters() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM atla_characters', (err, posts) => {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
}

function getCharacter(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM atla_characters WHERE id = ?', [id], (err, posts) => {
            if (err) {
                reject(err);
            } else {
                resolve(posts[0]);
            }
        });
    });
}

async function createComment(characterID, content, req) {
    const username = 'Guest';
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO characters_comments (characterID, user_name, content, created_at) VALUES (?, ?, ?, NOW())';
        db.query(sql, [characterID, username, content], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function getComments(characterID) {    return new Promise((resolve, reject) => {
    db.query('SELECT * FROM characters_comments WHERE characterID = ? ORDER BY created_at ASC', [characterID], (err, comments) => {
        if (err) {
            reject(err);
        } else {
            resolve(comments);
        }
    });
});
}

module.exports = {
    getCharacters,
    getCharacter,
    createComment,
    getComments
}