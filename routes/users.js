const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the usersRouter! Nice to meet you.');
});

router.get('/:id', (req, res, next) => {
    res.send('Received a GET request for user with id: ' + req.params.id);
})



module.exports = router;