const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema.js');

const Todo = new mongoose.model("Todo", todoSchema);

//Get All Todos 
router.get('/', async (req, res) => {
    try {
        let data = await Todo.find();
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//get only active todo
router.get('/activeTodo', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive(); //call custom instance method to find active todo
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//get todo by title that's contain js
router.get('/findTitleByJs', async (req, res) => {
    try {
        const data = await Todo.findTitleByJs(); //call custom static method to find title
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//get todos by language
//call own Query Helper
router.get('/findTitleByLanguage', async (req, res) => {
    try {
        const data = await Todo.find().byLanguage("React"); //call Query Helpermethod to find title
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});


//Get All Todos onlySelectedFiled 
router.get('/onlySelectedFiled', async (req, res) => {
    try {
        const data = await Todo.find({ status: 'active' })
            .select({
                _id: 0,
                date: 0
            })
            .limit(2)
            .exec();
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});


//Get A Todo by ID
router.get('/:id', async (req, res) => {
    try {
        let data = await Todo.find({ _id: req.params.id });
        if (data) {
            res.status(200).json({
                result: data,
                message: 'Success',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//POST Todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        let data = await newTodo.save();
        if (data) {
            res.status(200).json({
                message: 'Todo Was Inserted Successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }

});

//POST Multiple Todo
router.post('/all', async (req, res) => {
    try {
        let data = await Todo.insertMany(req.body);
        if (data) {
            res.status(200).json({
                message: 'Todo Was Inserted Successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//Update Todo
router.put('/:id', async (req, res) => {
    try {
        let data = await Todo.updateOne({ _id: req.params.id },
            {
                $set: {
                    status: "inactive"
                }
            });

        if (data) {
            res.status(200).json({
                message: 'Todo Was Updated Successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

//Delete Todo
router.delete('/:id', async (req, res) => {
    try {
        let data = await Todo.deleteOne({ _id: req.params.id });

        if (data) {
            res.status(200).json({
                message: 'Todo Was Deleted Successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});

module.exports = router;