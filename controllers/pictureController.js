const pictureModel = require('../models/pictureModel');
const uuid = require('uuid');
const db = require("../services/database").config;

async function getPictureByUserId(uID) {
    return pictureModel.getPictureByUserId();

}
async function uploadPicture(req, res, next) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded',
            });
        } else {
            const uID = req.params.id;
            const picture = req.files.picture;
            const pictureUUID = uuid.v4();
            const pictureName = `${pictureUUID}.jpg`;
            const filename = `./uploads/${pictureName}`;

            await pictureModel.updateUserPicture(uID, pictureUUID);
            await picture.mv(filename);
            console.log('File uploaded to: ' + filename);

            res.redirect(`/users/${uID}`);
        }
    } catch (err) {
        console.log(err); // log the error to the console
        res.status(500).send({error: err.message}); // send the error message as response
    }
}

module.exports = {
    uploadPicture,
    getPictureByUserId
};