const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require("./routeHandler/todoHandler.js");

const app = express();
app.use(express.json());

//database connection with moongose
mongoose.connect('mongodb://127.0.0.1:27017/myTodos')
    .then(() => console.log('connection successful'))
    .catch(err => console.log('error'));

//application routes
app.use('/todo', todoHandler);


app.listen(3000, () => {
    console.log('listening on port 3000');
});