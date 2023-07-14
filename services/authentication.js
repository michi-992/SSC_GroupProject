const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require('bcrypt');

async function authenticateUser({username, password}, users, res) {
    const user = users.find(u => {
        return u.username === username;
    });

    if (user) {
        if (await checkPassword(password, user.password)) {
            const accessToken = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.role
                }, ACCESS_TOKEN_SECRET, {
                    expiresIn: '2h'
                }
            );
            res.cookie('accessToken', accessToken);
            res.redirect('/users/' + user.id);
        } else {
            res.render('login', {message: 'Password incorrect'});
        }
    } else {
        res.render('login', {message: 'No user found.'});
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    req.currentUser = {username: 'Guest'};
    const userID = parseInt(req.params.id);

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.redirect('/login');
            }
            req.currentUser = user;
            console.log('userId ' + userID)
            console.log('current id ' + req.currentUser.id)
            if (userID !== req.currentUser.id) {
                res.render('error');
            } else {
                next();
            }
        })
    } else {
        req.currentUser = {username: 'Guest'};
    }
}

function checkForUser(req, res, next) {
    const token = req.cookies['accessToken'];
    req.currentUser = {username: 'Guest'};

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                req.currentUser = {username: 'Guest'};
            }
            req.currentUser = user
            next();
        });
    } else {
        req.currentUser = {username: 'Guest'};
        next();
    }
}


async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    checkForUser
}