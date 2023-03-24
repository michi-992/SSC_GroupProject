const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
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
        try {
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
