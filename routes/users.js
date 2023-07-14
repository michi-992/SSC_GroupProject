const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const pictureController = require('../controllers/pictureController');
const teamController = require('../controllers/teamController');
const nationController = require('../controllers/nationController');
const db = require('../services/database').config;
const authenticationService = require('../services/authentication');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

router.get('/:id/edit', authenticationService.authenticateJWT, userController.editUser);
router.post('/:id', authenticationService.authenticateJWT, userController.updateUser);

router.delete('/:id/delete', authenticationService.authenticateJWT, userController.deleteUser);
router.delete('/:id/nation/delete', authenticationService.authenticateJWT, nationController.deleteNation);
router.get('/:id/picture/upload', authenticationService.authenticateJWT, (req, res, next) => {
    const currentUser = req.currentUser;
    res.render('upload', {id: req.params.id, currentUser});
});

router.post('/:id/picture', authenticationService.authenticateJWT, pictureController.uploadProfilePic);

router.get('/:id/teamBuilding', authenticationService.authenticateJWT, teamController.getCharacters);
router.post('/:id/teamBuilding', authenticationService.authenticateJWT, teamController.createTeam);
router.delete('/:id/teamBuilding/:teamID/delete', authenticationService.authenticateJWT, teamController.deleteTeam);

module.exports = router;