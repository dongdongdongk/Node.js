const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'UserName Required']
    },
    password : {
        type : String,
        required : [true, 'Password Required']
    }
})

module.exports = mongoose.model('User', userSchema);