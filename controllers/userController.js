const userModel = require('../models/userModel');
const pictureModel = require('../models/pictureModel');
const teamModel = require('../models/teamModel');
const fs = require("fs");

async function getUsers(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const users = await userModel.getUsers();
        res.render('users', {users, currentUser});
    } catch (error) {
        console.log(error);
        res.status(404)
        next(error);
    }
}


async function getUser(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const user = await userModel.getUser(req.params.id);
        const teams = await teamModel.getTeamsByID(req.params.id);
        const profilePic = await pictureModel.getProfilePicByUserId(req.params.id);
        console.log(profilePic);
        res.render('user', {user, currentUser, teams, profilePic});
    } catch (error) {
        next(error);
    }
}

async function editUser(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const userId = req.params.id;
        let user = await userModel.getUser(userId);
        res.render('editUser', {user, message: '', currentUser});
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const userID = req.params.id;
        const user = await userModel.getUser(userID);
        const users = await userModel.getUsers();
        const checkIfExistingUsername = users.find(u => {
            if (user.username === u.username) {
                return;
            } else {
                return u.username === req.body.username;
            }
        });

        if (checkIfExistingUsername) {
            const message = 'This username is already taken.'
            res.render('editUser', {user, message, currentUser});
        } else {
            await userModel.updateUser(req.body, userID);

            res.redirect(`/users/${userID}`);
        }

    } catch (error) {
        next(error);
    }
}

async function addUser(req, res, next) {
    try {
        const currentUser = req.currentUser;
        res.render('addUser', {message: '', currentUser});
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const currentUser = req.currentUser;
        const userData = req.body;
        const users = await userModel.getUsers();
        const user = users.find(u => {
            return u.username === userData.username;
        });

        if (user) {
            const message = 'This username is already taken.'
            res.render('addUser', {message, currentUser})
        } else {
            await userModel.createUser(userData);
            res.redirect('/login');
        }
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const picture = await pictureModel.getProfilePicByUserId(req.params.id);
    if (picture) {
        const existingFilepath = `./public/uploads/${picture}.jpg`;
        fs.unlinkSync(existingFilepath);
    }
    userModel.deleteUser(req.params.id)
        .then(() => {
            res.redirect('/users');
        }).catch((error) => {
        next(error);
    })
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
    addUser,
    createUser,
    deleteUser
}
