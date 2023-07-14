/*

const fs = require("fs");
const uuid = require("uuid");
const db = require('../services/database.js').config;

let getProfilePicByUserId = (uID) => new Promise((resolve, reject) => {
    db.query('SELECT pictureUUID FROM user_pictures WHERE uID = ?', [uID], function (err, results, fields) {
        if (err) {
            reject(err)
        }
        if (results.length === 0) {
            resolve(null);
        } else {
            resolve(results.map(result => result.pictureUUID));
        }
    })
});

const updateUserProfilePic = async (uID, picture) => {
    try {
        const pictureUUID = uuid.v4();
        const pictureName = `${pictureUUID}.jpg`;
        const filepath = `./public/uploads/${pictureName}`;
        await db.query('SELECT pictureUUID FROM user_pictures WHERE uID = ?', [uID], async function (error, results, fields) {
            if (results && results.length > 0) {
                const existingPictureUUID = results[0].pictureUUID;
                if (existingPictureUUID !== pictureUUID) {
                    const existingFilepath = `./public/uploads/${existingPictureUUID}.jpg`;
                    fs.unlinkSync(existingFilepath);
                    await db.query('UPDATE user_pictures SET pictureUUID = ? WHERE uID = ?', [pictureUUID, uID]);
                } else {
                    console.log("picture already exists");
                }
            } else {
                console.log("no existing picture found");
                const insertSql = 'INSERT INTO user_pictures (uID, pictureUUID) VALUES (?, ?)';
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