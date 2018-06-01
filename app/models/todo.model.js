const mongoose = require('mongoose');

// const NoteSchema = mongoose.Schema({
//     title: String,
//     content: String,
//     done:{
//         type:Boolean,
//         default:false
//     }
// }, {
//     timestamps: true
// });

const TodoSchema = mongoose.Schema({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);