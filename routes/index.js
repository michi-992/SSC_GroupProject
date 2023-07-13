const express = require('express');
const router = express.Router();
const authenticationService = require('../services/authentication');
const userModel = require('../models/userModel')
const userController = require('../controllers/userController')
const characterController = require('../controllers/characterController')


router.route('/')
    .get((req, res) => {
        res.render('index', );
    })
    .post((req, res) => {
    console.log(req.body);
    res.send('received a POST request');
});

router.get('/register', userController.addUser);
router.post('/register', userController.createUser);


router.route('/login')
    .get((req, res, next) => {
        res.render('login');
    })
    .post((req, res, next) => {
        userModel.getUsers()
            .then((users) => {
                authenticationService.authenticateUser(req.body, users, res)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    });

router.get('/logout', (req, res, next) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/')
})

router.get('/cookies', (req, res, next) => {
    // console.log(req.cookies); //read cookie
    // res.cookie('myCookie', 'Hello World'); // set cookies
    // res.send('Cookie has been set');

    let counter = req.cookies['visitCounter'];
    console.log('Current visitCounter is at ' + counter);
    if (isNaN(counter)) counter = 0;
    counter++;
    console.log('New visitCounter is at ' + counter);
    res.cookie('visitCounter', counter, {maxAge: 2*60*60*1000});
    res.send('You have visited this page ' + counter + ' times.');

})

router.get('/chat', authenticationService.getUserThroughToken, (req, res, next) => {
    res.render('chat', { username: req.user.username });
});

router.get('/characters', characterController.getCharacters);
router.get('/characters/character/:id', characterController.getCharacter);
router.post('/characters/create-comment', characterController.createComment);

module.exports = router;