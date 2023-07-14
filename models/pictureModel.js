const fs = require("fs");
const uuid = require("uuid");
const db = require('../services/database.js').config;

// Function to get profile picture by user ID
let getProfilePicByUserId = (uID) => new Promise((resolve, reject) => {
    db.query('SELECT profilePicture FROM user_pictures WHERE userID = ?', [uID], function (err, results, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        if (results.length === 0) {
            resolve(null); // Resolve with null if no profile picture found
        } else {
            resolve(results.map(result => result.profilePicture)); // Resolve with the profile picture found
        }
    });
});

// Function to update profile picture
const updateUserProfilePic = async (uID, picture) => {
    try {
        const pictureUUID = uuid.v4();
        const pictureName = `${pictureUUID}.jpg`;
        const filepath = `./public/uploads/${pictureName}`;
        await db.query('SELECT profilePicture FROM user_pictures WHERE userID = ?', [uID], async function (error, results, fields) {
            if (results && results.length > 0) {
                const existingPictureUUID = results[0].profilePicture;
                if (existingPictureUUID !== pictureUUID) {
                    const existingFilepath = `./public/uploads/${existingPictureUUID}.jpg`;
                    fs.unlinkSync(existingFilepath); // Remove existing picture file
                    await db.query('UPDATE user_pictures SET profilePicture = ? WHERE userID = ?', [pictureUUID, uID]); // Update profile picture UUID in the database
                } else {
                    console.log("picture already exists"); // Log message if the same profile picture already exists
                }
            } else {
                const insertSql = 'INSERT INTO user_pictures (userID, profilePicture) VALUES (?, ?)';
                await db.query(insertSql, [uID, pictureUUID]); // Insert new profile picture UUID in the database
            }
        });
        await picture.mv(filepath); // Move and save the profile picture file
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getProfilePicByUserId,
    updateUserProfilePic,
};