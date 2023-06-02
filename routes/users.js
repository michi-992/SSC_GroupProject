const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const pictureController = require('../controllers/pictureController');
const db = require('../services/database').config;
const authenticationService = require('../services/authentication');

router.get('/', userController.getUsers);

router.use(authenticationService.authenticateJWT);


router.get('/:id', userController.getUser);
router.get('/:id/edit', userController.editUser);
router.post('/:id', userController.updateUser);
router.delete('/:id/delete', userController.deleteUser);


router.get('/:id/picture/upload', (req, res, next) => {
    res.render('upload', {id: req.params.id});
});

router.post('/:id/picture', pictureController.uploadProfilePic);

module.exports = router;