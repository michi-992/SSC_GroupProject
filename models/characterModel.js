const db = require('../services/database.js').config;

// Function to get all ATLA characters
function getCharacters() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM atla_characters', (err, characters) => {
            if (err) {
                reject(err); // Reject with error if query fails
            } else {
                resolve(characters); // Resolve with the retrieved characters data
            }
        });
    });
};

// Function to get a specific ATLA character by ID
function getCharacter(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM atla_characters WHERE id = ?', [id], (err, character) => {
            if (err) {
                reject(err); // Reject with error if query fails
            } else {
                resolve(character[0]); // Resolve with the retrieved character data
            }
        });
    });
};

// Function to create a comment for a character
async function createComment(characterID, content, userID, username) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO characters_comments (characterID, user_id, username, content, created_at) VALUES (?, ?, ?, ?, NOW())';
        db.query(sql, [characterID, userID, username, content], (err, result) => {
            if (err) {
                reject(err); // Reject with error if query fails
            } else {
                resolve(result); // Resolve with the result of the comment creation
            }
        });
    });
};

// Function to get comments for a specific character
function getComments(characterID) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM characters_comments WHERE characterID = ? ORDER BY created_at ASC',
            [characterID],
            (err, comments) => {
                if (err) {
                    reject(err); // Reject with error if query fails
                } else {
                    resolve(comments); // Resolve with the retrieved comments data
                }
            }
        );
    });
};

// Function to delete a comment by ID
async function deleteComment(commentId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM characters_comments WHERE id = ?';
        db.query(sql, [commentId], (err, result) => {
            if (err) {
                reject(err); // Reject with error if query fails
            } else {
                resolve(result); // Resolve with the result of the comment deletion
            }
        });
    });
};

module.exports = {
    getCharacters,
    getCharacter,
    createComment,
    getComments,
    deleteComment,
};
