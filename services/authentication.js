const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require('bcrypt');

async function authenticateUser({username, password}, users, res) {
    const user = users.find(u => {
        return u.name === username;
    });

    if (user && await checkPassword(password, user.password)) {
        const accessToken = jwt.sign({id: user.id, name: user.name, exp: Math.floor(Date.now() / 1000) + (60*60), data: 'foobar'}, ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id);
    } else {
        res.send('Username or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) =>{
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

async function checkPassword(password, hash){
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

module.exports = {
    authenticateUser,
    authenticateJWT
}