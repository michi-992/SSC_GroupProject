const userModel = require('../models/userModel');

async function getUsers(req, res, next) {
    try {
        const users = await userModel.getUsers();
        res.render('users', {users});
    } catch (error) {
        res.sendStatus(500);
    }
}

async function getUser(req, res, next) {
    try {
        const user = await userModel.getUser(req.params.id);

        res.render('user', {user});
    } catch (error) {
        res.sendStatus(500)
    }
}

async function editUser(req, res, next) {
    try {
        const userId = req.params.id;
        let user = await userModel.getUser(userId);
        res.render('editUser', {user});
    } catch (error) {
        res.sendStatus(500)
    }
}

async function updateUser(req, res, next) {
    console.log("updateUser controller")
    try {
        await userModel.updateUser(req.body);
        const user = await userModel.getUser(req.body.id);
        res.render('user', {user});
    } catch (error) {
        res.sendStatus(500);
    }
}

async function addUser(req, res, next) {
    try {
        res.render('addUser');
    } catch (error) {
        res.sendStatus(500);
    }
};

async function createUser(req, res, next) {
    try {
        const userData = req.body;
        const user = await userModel.createUser(userData);
        res.redirect('/');
    } catch (error) {
        res.sendStatus(500);
    }
};

function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then((user) => {
            res.redirect('/users');
        }).catch((err) => {
        res.sendStatus(500);
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