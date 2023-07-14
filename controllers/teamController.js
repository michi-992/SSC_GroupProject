const teamModel = require('../models/teamModel');

// Function to get all ATLA characters
async function getCharacters(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve all ATLA characters using the teamModel
        const characters = await teamModel.getCharacters();

        // Render the 'teamBuilding' view and pass the characters and currentUser data
        res.render('teamBuilding', { characters, currentUser });
    } catch (error) {
        // Pass the error to the next middleware function for error handling
        next(error);
    }
};

// Function to create a team
async function createTeam(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve the team data from the request body
        const teamData = req.body;

        // Assign the userID of the current user to the teamData
        teamData.userID = currentUser.id;

        // Create a team using the teamModel and the provided teamData
        await teamModel.createTeam(teamData);
    } catch (error) {
        // Pass the error to the next middleware function for error handling
        next(error);
    }
};

// Function to delete a team
async function deleteTeam(req, res, next) {
    // Retrieve the teamID from the request parameters
    const teamID = req.params.teamID;

    // Use the teamModel to delete the team with the provided teamID
    teamModel.deleteTeam(teamID)
        .then(() => {
            // Redirect the user to the '/users' route after successful deletion
            res.redirect('/users');
        })
        .catch((error) => {
            // Pass the error to the next middleware function for error handling
            next(error);
        });
};

module.exports = {
    getCharacters,
    createTeam,
    deleteTeam
};