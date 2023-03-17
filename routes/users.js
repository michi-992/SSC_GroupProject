const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the users.js router.');
});

router.get('/:id', (req, res, next) => {
    res.send('Received a GET request for user with id: ' + req.params.id);
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.send('Received a POST request.')
});

module.exports = router;