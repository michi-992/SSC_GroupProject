const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the index.js router. Nice ta meetcha.');
});

router.get('/example/b', function (req, res, next) {
    console.log('I am the first function. I do nothing but talk.');
    next();
}, function (req, res) {
    res.send('This is the response from B!')
});

const cbC1 = function (req, res, next) {
    console.log('cbC1');
    next();
};

const cbC2 = function (req, res, next) {
    console.log('cbC2');
};

const cbC3 = function (req, res) {
    res.send('Hello from C! (cbC3)')
};

router.get('/example/c', [cbC1, cbC2, cbC3]);

const cbD1 = function (req, res, next) {
    console.log('cbD1');
    next();
};

const cbD2 = function (req, res, next) {
    console.log('cbD2');
    next();
};

router.get('/example/d', [cbD1, cbD2], function (req, res, next) {
    console.log('Hello from this function. Response will be sent by next one.');
    next();
}, function cbD3 (req, res) {
    res.send('This is the response from cbD3.');
});

module.exports = router;