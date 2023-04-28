const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function authenticateUser({username, password}, users, res) {
    const user = users.find((u) => {
        return u.name === username && u.password === password;
    });

    if (user) {
        const accessToken = jwt.sign({id: user.id, name: user.name, exp: Math.floor(Date.now() / 1000) + (10), data: 'foobar'}, ACCESS_TOKEN_SECRET);
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
            console.log(user);
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT
}