const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    done:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);