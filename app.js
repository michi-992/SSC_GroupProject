const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./services/database');
const websockets = require('./services/websockets');
const fs = require('fs')
const morgan = require('morgan');

app.use(express.static('public'));

const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const cors = require('cors');
app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload({createParentPath: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/requests.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('short'))

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

function errorHandler(err, req, res, next) {
    res.render('error', { error: err });
}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});