let Note = require('../models/note.model.js');

//create and save a new note
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
                //create a note in db
                var note = {
                    title: req.body[i].title,
                    content: req.body[i].content
                }
                new Note(note).save().then(data => {
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

//retrieve and return all notes from db
exports.findAll = (req, res) => {
    Note.find().then((data) => {
        if (!data) {
            res.status(404).send({ message: "No data found" })
        } else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send({ message: err })
    })
};

//retrieve a single note with note Id
//pass _id in URL
exports.findOne = (req, res) => {
    if (!req.params.noteId) {
        res.status(400).send({ message: "Please provide the ID of the note you want to search" })
    } else {
        Note.findOne({ _id: req.params.noteId }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "No notes found for the given ID" })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
}


//update a note with note ID
//pass _id in URL
//req obj 
exports.update = (req, res) => {
    if (!req.body.content || !req.params.noteId) {
        res.status(400).send({ message: "Please give ID and Content" })
    } else {
        Note.findOneAndUpdate({ _id: req.params.noteId }, { title: req.body.title, content: req.body.content }, { new: true }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "Note not found with given ID" })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
};

//delete a note with note Id
//pass _id in URL
exports.delete = (req, res) => {
    if (!req.params.noteId) {
        res.status(400).send({ message: "Please give the ID of the note to delete the note" })
    } else {
        Note.findOneAndRemove({ _id: req.params.noteId }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "Note with given ID is not found" })
            } else {
                res.send(data)
            }
        }).catch((err) => {
            res.status(500).send({ message: err })
        })
    }
};