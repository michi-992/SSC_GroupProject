const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const db = require('../services/database').config;

const authenticationService = require('../services/authentication');

router.use(authenticationService.authenticateJWT)

router.get('/register', userController.addUser);
router.post('/register', userController.createUser);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

router.get('/:id/edit', userController.editUser);
router.post('/:id', userController.updateUser);

router.delete('/:id/delete', userController.deleteUser);

router.route('/:id/picture')
    .get((req, res, next) => {
        let uID = req.params.id;
        let filename = uID + '.jpg';
        const options = {
            root: path.join(__dirname, '../uploads')
        };
        res.sendFile(filename, options);
    })
    .post((req, res, next) => {
        try { // relevant code in here
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded',
                });
            } else {
                let picture = req.files.picture;

                let filename = './uploads/' + req.params.id + '.jpg';
                picture.mv(filename);
                console.log('File uploaded to: ' + filename);

                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: picture.name,
                        size: picture.size,
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

module.exports = router;