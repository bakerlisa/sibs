const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength: [3, "Name needs to be at least 3 characters"],
        required: [true, "First name is required"]
    },
    image: {
        type:String
    },
    birthday:{
        type: Date,
        default: null
    },
    parents : {
        type: Array
    }
},{timestamps:true});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;