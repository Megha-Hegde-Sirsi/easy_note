module.exports = (app) => {
    const todo = require('../controllers/todo.controller.js');

    //create a new note
    app.post('/todo', todo.create);

    //retrieve all todo
    app.get('/todo', todo.findAll);

    //retrieve single note with note id
    app.get('/todo/:todoID', todo.findOne)

    //update a note with note ID
    app.put('/todo/:todoID', todo.update)

    //delete a note with note ID
    app.delete('/todo/:todoID', todo.delete)
}