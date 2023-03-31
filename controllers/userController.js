const userModel = require('../models/userModel');

// function getUsers(req, res, next) {
//     userModel.getUsers((err, users) => {
//         if (err) {
//             res.sendStatus(500)
//         }
//         res.render('users', {users});
//     });
// }

function getUsers(req, res, next) {
    userModel.getUsers()
        .then(users => res.render('users', {users}))
        .catch(error => res.sendStatus(500))
}

function getUser(req, res, next) {
    const user = userModel.getUser(parseInt(req.params.id));
    res.json(user);
    res.render('user', {user});
}

module.exports = {
    getUsers,
    getUser,
}
