const mongoose = require('mongoose');
const schema = mongoose.Schema;

let newUser = schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Users', newUser);