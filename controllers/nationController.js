const nationModel = require("../models/nationModel");

// Function to get all quiz questions
async function getQuestions(req, res, next) {
    try {
        const currentUser = req.currentUser;

        // Retrieve all quiz questions using the nationModel
        const questions = await nationModel.getQuestions();

        // Render the nationQuiz view with the retrieved questions, an empty result, and the current user
        res.render('nationQuiz', { questions, result: '', currentUser });
    } catch (error) {
        // If an error occurs, set the response status to 404
        res.status(404);
        // Continue to the next middleware
        next(error);
    }
};

// Function to determine the nation based on quiz answers
async function determineNation(req, res, next) {
    try {
        const currentUser = req.currentUser;

        // Retrieve the quiz answers from the request body
        const answers = req.body;

        // Determine the nation based on the quiz answers using the nationModel
        const nation = nationModel.determineNation(answers);

        // Retrieve all quiz questions using the nationModel
        const questions = await nationModel.getQuestions();

        if (currentUser.id) {
            // If a current user exists, save the determined nation for the user using the nationModel
            await nationModel.saveNation(currentUser.id, nation);
        }

        // Render the nationQuiz view with the retrieved questions, the determined nation as the result, and the current user
        res.render('nationQuiz', { questions, result: nation, currentUser });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Function to delete the determined nation for a user
async function deleteNation(req, res, next) {
    const currentUser = req.currentUser;

    // Delete the determined nation for the current user using the nationModel
    nationModel.deleteNation(currentUser.id)
        .then(() => {
            // Redirect to the user's profile page after deletion
            res.redirect('/users' + req.params.id);
        }).catch((error) => {
        // Pass the error to the next middleware
        next(error);
    });
};

module.exports = {
    getQuestions,
    determineNation,
    deleteNation
};