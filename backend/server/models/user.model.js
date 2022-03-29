const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        minlength: [3, "First name needs to be at least 3 characters"],
        required: [true, "First name is required"]
    },
    lastName: {
        type:String,
        minlength: [3, "Last name needs to be at least 3 characters"],
        required: [true, "Last name is required"]
    },
    madian:{
        type: String
    },
    email: {
        type: String,
        required: [true, "Eamil is required"]
    },
    password:{
        type: String,
        minlength: [8, "password needs to be at least 8 characters"],
        required: [true, "password is required"]
    },
    birthday: {
        type: Date
    },
    address: {
        type: String,
        minlength: [8, "address needs to be at least 8 characters"],
        required: [true, "address is required"]
    },
    same:{
        type: Boolean
    },
    mailing:{
        type: String,
        default: true
    },
    siblings:{
        type: Array
    },
    spouse:{
        type: Array
    },
    parents:{
        type: Array
    },
    kids: {
        type: Array
    },
    stepKids:{
        type:Array
    },
    stepParents:{
        type: Array
    },
    other:{
        type: Array
    },
    loggedIn:{
        type: Boolean,
        default:false
    }
},{timestamps:true});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;