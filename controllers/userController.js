const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers(req.params.id)
        .then(users => res.render('users', {users}))
        .catch(error => res.sendStatus(500))
}

function getUser(req, res, next) {
    const user = userModel.getUser(parseInt(req.params.id));
    res.render('user', {user});
}

module.exports = {
    getUsers,
    getUser,
}