/*

const fs = require("fs");
const uuid = require("uuid");
const db = require('../services/database.js').config;

let getProfilePicByUserId = (uID) => new Promise((resolve, reject) => {
    db.query('SELECT profilePicture FROM user_pictures WHERE userID = ?', [uID], function (err, results, fields) {
        if (err) {
            reject(err)
        }
        if (results.length === 0) {
            resolve(null);
        } else {
            resolve(results.map(result => result.profilePicture));
        }
    })
});

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
                    fs.unlinkSync(existingFilepath);
                    await db.query('UPDATE user_pictures SET profilePicture = ? WHERE userID = ?', [pictureUUID, uID]);
                } else {
                    console.log("picture already exists");
                }
            } else {
                console.log("no existing picture found");
                const insertSql = 'INSERT INTO user_pictures (userID, profilePicture) VALUES (?, ?)';
                await db.query(insertSql, [uID, pictureUUID]);
            }
        })
        await picture.mv(filepath);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getProfilePicByUserId,
    updateUserProfilePic,
};

 */