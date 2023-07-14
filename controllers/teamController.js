const teamModel = require('../models/teamModel');
const pictureModel = require("../models/pictureModel");
const fs = require("fs");
const userModel = require("../models/userModel");

async function getCharacters(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const characters = await teamModel.getCharacters();

        res.render('teamBuilding', {characters, currentUser});
    } catch (error) {
        next(error);
    }
}

async function createTeam(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const teamData = req.body;
        teamData.userID = currentUser.id;

        await teamModel.createTeam(teamData);
    } catch (error) {
        next(error);
    }
}

async function deleteTeam(req, res, next) {
    console.log(req.params.teamID);
    teamModel.deleteTeam(req.params.teamID)
        .then(() => {
            res.redirect('/users');
        }).catch((error) => {
        next(error);
    })
}

module.exports = {
    getCharacters,
    createTeam,
    deleteTeam
}