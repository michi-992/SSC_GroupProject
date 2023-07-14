const express = require('express');
const router = express.Router();

const authenticationService = require('../services/authentication');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const nationController = require('../controllers/nationController');
const characterController = require('../controllers/characterController');


router.use(authenticationService.checkForUser);
router.route('/')
    .get((req, res) => {
        const currentUser = req.currentUser;
        res.render('index', {currentUser});
    })

router.route('/register')
    .get(userController.addUser)
    .post(userController.createUser);

router.route('/login')
    .get((req, res, next) => {
        const currentUser = req.currentUser
        res.render('login', {message: '', currentUser});
    })
    .post((req, res, next) => {
        userModel.getUsers()
            .then((users) => {
                authenticationService.authenticateUser(req.body, users, res)
            })
            .catch((err) => {
                next(err);
            })
    });

router.get('/logout', (req, res, next) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/')
})



router.get('/chat', (req, res, next) => {
    res.render('chat', {username: req.currentUser.username, currentUser: req.currentUser});
});

router.route('/quiz')
    .get(nationController.getQuestions)
    .post(nationController.determineNation)


router.get('/characters', characterController.getCharacters);
router.get('/characters/character/:characterID', characterController.getCharacter);
router.post('/characters/create-comment', characterController.createComment);
router.delete('/characters/character/:characterID/:commentID/delete', characterController.deleteComment);

module.exports = router;