const pictureModel = require('../models/pictureModel');

// Function to upload a user's profile picture
async function uploadProfilePic(req, res, next) {
    try {
        if (req.files) {
            // Check if files were uploaded in the request

            // Retrieve the user ID from the request parameters
            const uID = req.params.id;

            // Retrieve the uploaded picture file from the request files
            const picture = req.files.picture;

            // Update the user's profile picture using the pictureModel
            await pictureModel.updateUserProfilePic(uID, picture);

            // Redirect the user to their profile page
            res.redirect(`/users/${uID}`);
        }
    } catch (err) {
        // Pass the error to the next middleware
        next(err);
    }
};

module.exports = {
    uploadProfilePic
};