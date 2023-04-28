const fs = require("fs");
const db = require('../services/database.js').config;


let getPictureByUserId = (uID) => new Promise((resolve, reject) => {
    db.query('SELECT pictureUUID FROM user_pictures WHERE uID = ?', [uID], function (err, results, fields) {
        if (err) {
            reject(err)
        }
        if (results.length === 0) {
            resolve(null);
        } else {
            console.log(results);
            resolve(results.map(result => result.pictureUUID));
        }
    })
});

const updateUserPicture = async (uID, pictureUUID) => {
    try {
        await db.query('SELECT pictureUUID FROM user_pictures WHERE uID = ?', [uID], async function (error, results, fields) {
            if (results && results.length > 0) {
                const existingPictureUUID = results[0].pictureUUID;
                if (existingPictureUUID !== pictureUUID) {
                    const existingFilename = `./uploads/${existingPictureUUID}.jpg`;
                    fs.unlinkSync(existingFilename);
                    await db.query('UPDATE user_pictures SET pictureUUID = ? WHERE uID = ?', [pictureUUID, uID]);
                } else {
                    console.log("picture already exists");
                }
            } else {
                console.log("no existing picture found");
                const insertSql = 'INSERT INTO user_pictures (uID, pictureUUID) VALUES (?, ?)';
                const insertResult = await db.query(insertSql, [uID, pictureUUID]);
            }
        })
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getPictureByUserId,
    updateUserPicture,
};