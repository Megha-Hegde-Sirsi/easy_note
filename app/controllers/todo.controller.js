let Todo = require('../models/todo.model.js');

//create and save a new todo
//Req obj {title:string, content: string}
exports.create = (req, res) => {
    var resArr = new Array();
    var promiseArr = new Array();
    //validate input
    for (let i = 0; i < req.body.length; i++) {
        var p = new Promise((resolve, reject) => {
            if (!req.body[i].title || !req.body[i].content) {
                res.status(400).send({ message: "Note cannot be empty" })
            } else {
                //create a todo in db
                var todo = {
                    title: req.body[i].title,
                    content: req.body[i].content
                }
                new Todo(todo).save().then(data => {
                    resArr.push(data)
                    resolve();
                    // res.send(data)
                }).catch((err) => {
                    res.status(500).send({ message: err })
                    reject();
                })
            }
        })
        promiseArr.push(p);
    }
    Promise.all(promiseArr).then((result) => {
        res.send(resArr)
    })
};

//retrieve and return all todo from db
exports.findAll = (req, res) => {
    Todo.find().then((data) => {
        if (!data) {
            res.status(404).send({ message: "No data found" })
        } else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send({ message: err })
    })
};

//retrieve a single todo with todo Id
//pass _id in URL
exports.findOne = (req, res) => {
    if (!req.params.todoId) {
        res.status(400).send({ message: "Please provide the ID of the note you want to search" })
    } else {
        Todo.findOne({ _id: req.params.todoId }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "No todo found for the given ID" })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
}


//update a todo with todo ID
//pass _id in URL
//req obj 
exports.update = (req, res) => {
    if (!req.body.content || !req.params.todoId) {
        res.status(400).send({ message: "Please give ID and Content" })
    } else {
        Todo.findOneAndUpdate({ _id: req.params.todoId }, { title: req.body.title, content: req.body.content, done: req.body.done }, { new: true }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "todo not found with given ID" })
            } else {
                console.log(data)
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
};

//delete a todo with todo Id
//pass _id in URL
exports.delete = (req, res) => {
    if (!req.params.todoId) {
        res.status(400).send({ message: "Please give the ID of the todo to delete the todo" })
    } else {
        Todo.findOneAndRemove({ _id: req.params.todoId }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "todo with given ID is not found" })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
};