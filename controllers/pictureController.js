const pictureModel = require('../models/pictureModel');

async function getProfilePicByUserId(uID) {
    return pictureModel.getProfilePicByUserId(uID);
}
async function uploadProfilePic(req, res, next) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded',
            });
        } else {
            const uID = req.params.id;
            const picture = req.files.picture;

            await pictureModel.updateUserProfilePic(uID, picture);


            res.redirect(`/users/${uID}`);
        }
    } catch (err) {
        res.status(500)
    }
}

module.exports = {
    uploadProfilePic,
    getProfilePicByUserId
};