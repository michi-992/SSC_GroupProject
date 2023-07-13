const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require('bcrypt');

async function authenticateUser({username, password}, users, res) {
    const user = users.find(u => {
        return u.name === username;
    });

    if (user && await checkPassword(password, user.password)) {
        let accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id);
    } else {
        res.send('Username or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            const currentUser = req.user;
            req.user.role = user.role;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

function getUserThroughToken(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        // If no token is present, set the username to "Guest"
        req.user = { username: 'Guest' };
        next();
    }
}


async function checkPassword(password, hash){
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    getUserThroughToken
}