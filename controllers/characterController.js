const characterModel = require('../models/characterModel');

// Function to get all characters
async function getCharacters(req, res, next) {
    try {
        const currentUser = req.currentUser;

        // Retrieve all characters using the characterModel
        const characters = await characterModel.getCharacters();

        // Render the characters view with the retrieved characters and the current user
        res.render('characters', { characters, currentUser });
    } catch (err) {
        // Pass the error to the next middleware
        next(err);
    }
};

// Function to get a specific character
async function getCharacter(req, res, next) {
    try {
        const characterId = req.params.characterID;
        const currentUser = req.currentUser;

        // Retrieve the specific character based on the character ID using the characterModel
        const character = await characterModel.getCharacter(characterId);

        // Retrieve the comments for the specific character using the characterModel
        const comments = await characterModel.getComments(characterId);

        // Render the character view with the retrieved character, comments, and the current user
        res.render('character', { character, comments, currentUser });
    } catch (err) {
        // Pass the error to the next middleware
        next();
    }
};

// Function to create a comment for a character
async function createComment(req, res, next) {
    const { characterId, content } = req.body;
    const currentUser = req.currentUser;

    try {
        // Create a comment for the character using the characterModel
        await characterModel.createComment(characterId, content, currentUser.id, currentUser.username);

        // Redirect to the specific character's page after creating the comment
        res.redirect(`/characters/character/${characterId}`);
    } catch (err) {
        // Pass the error to the next middleware
        next();
    }
};

// Function to delete a comment
async function deleteComment(req, res, next) {
    characterModel.deleteComment(req.params.commentID)
        .then(() => {
            // Redirect to the specific character's page after deleting the comment
            res.redirect(`/characters/character/${req.params.characterID}`);
        }).catch((error) => {
        // Pass the error to the next middleware
        next(error);
    });
};

module.exports = {
    getCharacters,
    getCharacter,
    createComment,
    deleteComment,
};