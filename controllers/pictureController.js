/*

const pictureModel = require('../models/pictureModel');

async function uploadProfilePic(req, res, next) {
    try {
        if (req.files) {
            const uID = req.params.id;
            const picture = req.files.picture;
            console.log()
            await pictureModel.updateUserProfilePic(uID, picture);

            res.redirect(`/users/${uID}`);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    uploadProfilePic
};

 */