const userModel = require('../models/userModel');
const pictureModel = require('../models/pictureModel');
const teamModel = require('../models/teamModel');
const fs = require("fs");

// Function to get all users
async function getUsers(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve all users using the userModel
        const users = await userModel.getUsers();

        // Render the 'users' view and pass the users and currentUser data
        res.render('users', { users, currentUser });
    } catch (error) {
        // If an error occurs, set the response status to 404 and pass the error to the next middleware
        res.status(404);
        next(error);
    }
}

// Function to get a specific user
async function getUser(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve the user with the provided ID using the userModel
        const user = await userModel.getUser(req.params.id);

        // Retrieve the teams associated with the user using the teamModel
        const teams = await teamModel.getTeamsByID(req.params.id);

        // Retrieve the profile picture of the user using the pictureModel
        const profilePic = await pictureModel.getProfilePicByUserId(req.params.id);

        // Render the 'user' view and pass the user, teams, profilePic, and currentUser data
        res.render('user', { user, currentUser, teams, profilePic });
    } catch (error) {
        // Passes the error to the next middleware
        next(error);
    }
}

// Function to render the edit user page
async function editUser(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve the ID of the user to be edited from the request parameters
        const userId = req.params.id;

        // Retrieve the user with the provided ID using the userModel
        let user = await userModel.getUser(userId);

        // Render the 'editUser' view and pass the user, an empty message, and currentUser data
        res.render('editUser', { user, message: '', currentUser });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Function to update a user
async function updateUser(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve the ID of the user to be updated from the request parameters
        const userID = req.params.id;

        // Retrieve the user with the provided ID using the userModel
        const user = await userModel.getUser(userID);

        // Retrieve all users using the userModel
        const users = await userModel.getUsers();

        // Check if the new username already exists for another user
        const checkIfExistingUsername = users.find(u => {
            if (user.username === u.username) {
                return;
            } else {
                return u.username === req.body.username;
            }
        });

        if (checkIfExistingUsername) {
            // If username already exists, render the 'editUser' view with an error message
            const message = 'This username is already taken.';
            res.render('editUser', { user, message, currentUser });
        } else {
            // Update the user using the userModel and redirect to the user's profile page
            await userModel.updateUser(req.body, userID);
            res.redirect(`/users/${userID}`);
        }
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Function to render the add user page
async function addUser(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Render the 'addUser' view with an empty message and currentUser data
        res.render('addUser', { message: '', currentUser });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Function to create a new user
async function createUser(req, res, next) {
    try {
        // Retrieve the current user from the request object
        const currentUser = req.currentUser;

        // Retrieve the user data from the request body
        const userData = req.body;

        // Retrieve all users using the userModel
        const users = await userModel.getUsers();

        // Check if the username already exists for another user
        const user = users.find(u => {
            return u.username === userData.username;
        });

        if (user) {
            // If username already exists, render the 'addUser' view with an error message
            const message = 'This username is already taken.';
            res.render('addUser', { message, currentUser });
        } else {
            // Create the new user using the userModel and redirect to the login page
            await userModel.createUser(userData);
            res.redirect('/login');
        }
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Function to delete a user
async function deleteUser(req, res, next) {
    try {
        // Retrieve the profile picture of the user using the pictureModel
        const picture = await pictureModel.getProfilePicByUserId(req.params.id);

        if (picture) {
            // If the user has a profile picture, delete the corresponding file
            const existingFilepath = `./public/uploads/${picture}.jpg`;
            fs.unlinkSync(existingFilepath);
        }

        // Delete the user with the provided ID using the userModel
        await userModel.deleteUser(req.params.id);

        // Redirect the user to the '/users' route after successful deletion
        res.redirect('/users');
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
    addUser,
    createUser,
    deleteUser
}