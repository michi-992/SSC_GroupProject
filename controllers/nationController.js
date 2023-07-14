const nationModel = require("../models/nationModel");
const pictureModel = require("../models/pictureModel");
const fs = require("fs");
const userModel = require("../models/userModel");

async function getQuestions(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const questions = await nationModel.getQuestions();

        res.render('nationQuiz', {questions, result: '', currentUser});
    } catch (error) {
        console.log(error);
        res.status(404)
    }
}

async function determineNation(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const answers = req.body;
        const nation = nationModel.determineNation(answers);
        const questions = await nationModel.getQuestions();

        if (currentUser.id) {
            await nationModel.saveNation(currentUser.id, nation);
        }

        res.render('nationQuiz', {questions, result: nation, currentUser})
    } catch (error) {
        next(error);
    }
}

async function deleteNation(req, res, next) {
    const currentUser = req.currentUser
    nationModel.deleteNation(currentUser.id)
        .then(() => {
            res.redirect('/users' + req.params.id);
        }).catch((error) => {
        next(error);
    })
}

module.exports = {
    getQuestions,
    determineNation,
    deleteNation
}