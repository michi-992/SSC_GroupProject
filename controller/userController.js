const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    const users = userModel.getUsers(req.params.id);
    res.render('users', {users});
};

function getUser(req, res, next) {
    const user = userModel.getUser(parseInt(req.params.id));
    res.json(user);
};

module.exports = {
    getUsers,
    getUser
};