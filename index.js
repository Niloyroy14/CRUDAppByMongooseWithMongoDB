const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require("./routeHandler/todoHandler.js");
const userHandler = require("./routeHandler/userHandler.js");

const app = express();
app.use(express.json());


dotenv.config(); //Getting environment variable

//database connection with moongose
mongoose.connect('mongodb://127.0.0.1:27017/myTodos')
    .then(() => console.log('connection successful'))
    .catch(err => console.log('error'));

//application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ erro: err });
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log('listening on port 3000');
});