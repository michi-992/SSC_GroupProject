const express = require('express');
const router = express.Router();
const { members } = require('../models/userModel');
router.get('/', (req, res) => {
    res.render('index', {title: 'Express', members: members});
});

router.get('/example/b', function(req, res, next) {
    console.log('I am the first function, I do nothing but talk');
    next();
}, function (req, res) {
    res.send('This is the response from B.');
});


const cbC1 = function (req, res, next) {
    console.log('cbC1');
    next();
};

const cbC2 = function (req, res, next) {
    console.log('cbC2');
    next();
};

const cbC3 = function (req, res) {
    res.send('Hello from C! (cbC3)');
}

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
    console.log('Hello from this function. Repsonse will come from the next one...');
    next();
}, function cbD3 (req, res) {
    res.send('This is the response from cbD3.');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('received a POST request');
});

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

router.get('/chat', (req, res) => {
    res.render('chat')
});

module.exports = router;