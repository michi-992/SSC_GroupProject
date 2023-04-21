const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers(req.params.id)
        .then(users => res.render('users', {users}))
        .catch(error => res.sendStatus(500))
}

function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then(user => res.render('user', {user}))
        .catch(error => res.sendStatus(500))
}

function editUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then((user) => {
            res.render('editUser', {user})
        })
        .catch((error) => {
            res.sendStatus(500)
        })
}

function updateUser(req, res, next) {
    userModel.updateUser(req.body)
        .then((user) => {
            res.render('user', {user})
        })
        .catch((error) => {
            res.sendStatus(500)
        })
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
}