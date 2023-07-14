const characterModel = require('../models/characterModel');
const pictureModel = require("../models/pictureModel");
const fs = require("fs");
const userModel = require("../models/userModel");

async function getCharacters(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const characters = await characterModel.getCharacters();
        res.render('characters', { characters , currentUser});
    } catch (err) {
        console.log('Error retrieving posts: ', err);
       next(err);
    }
}

async function getCharacter(req, res, next) {
    try {
        const characterId = req.params.characterID;
        const currentUser = req.currentUser;
        const character = await characterModel.getCharacter(characterId);
        const comments = await characterModel.getComments(characterId);
        res.render('character', { character, comments, currentUser });
    } catch (err) {
        console.log('Error retrieving post details: ', err);
        next();
    }
}

async function createComment(req, res, next) {
    const { characterId, content } = req.body;
    const currentUser = req.currentUser;
    console.log(currentUser);
    try {
        await characterModel.createComment(characterId, content, currentUser.id, currentUser.username);
        res.redirect(`/characters/character/${characterId}`);
    } catch (err) {
        next();
    }
}

async function deleteComment(req, res, next) {
    characterModel.deleteComment(req.params.commentID)
        .then(() => {
            res.redirect(`/characters/character/${req.params.characterID}`);
        }).catch((error) => {
        next(error);
    })
}

module.exports = {
    getCharacters,
    getCharacter,
    createComment,
    deleteComment,
}