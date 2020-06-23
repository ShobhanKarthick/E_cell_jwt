const mongoose = require('mongoose');
const schema = mongoose.Schema;

let newPost = new schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type:String,
        required: true,
    }
})

module.exports = mongoose.model("posts", newPost);