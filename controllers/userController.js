const userModel = require('../models/userModel');
const pictureModel = require('../models/pictureModel');
async function getUsers(req, res, next) {
    try {
        const users = await userModel.getUsers();
        res.render('users', {users});
    } catch (error) {
        console.log(error);
        res.status(404)
        next(err);
    }
}
async function getUser(req, res, next) {
    try {
        const user = await userModel.getUser(req.params.id);
        const pictureUUID = await pictureModel.getProfilePicByUserId(req.params.id);
        res.render('user', {user, pictureUUID});
    } catch (error) {
        console.log(error);
        res.status(404)
        next(err);
    }
}
async function editUser(req, res, next) {
    try {
        const userId = req.params.id;
        let pictureUUID = await pictureModel.getProfilePicByUserId(userId);
        let user = await userModel.getUser(userId);
        res.render('editUser', {user, pictureUUID});
    } catch (error) {
        res.status(404)
        next(err);
    }
}
async function updateUser(req, res, next) {
    try {
        await userModel.updateUser(req.body);
        const user = await userModel.getUser(req.body.id);
        const pictureUUID = await pictureModel.getProfilePicByUserId(req.body.id);
        res.render('user', {user, pictureUUID});
    } catch (error) {
        res.status(404)
        next(err);
    }
}
async function addUser(req, res, next) {
    try {
        res.render('addUser');
    } catch (error) {
        res.status(404)
        next(err);
    }
}
async function createUser(req, res, next) {
    try {
        const userData = req.body;
        const user = await userModel.createUser(userData);
        res.redirect('/');
    } catch (error) {
        res.status(404)
        next(err);
    }
}
function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then((user) => {
            res.redirect('/users');
        }).catch((err) => {
        res.status(404)
        next(err);
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