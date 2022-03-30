const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        type: String,
        default: null
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
        type: Array,
        default: []
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
    stepSibling:{
        type: Array
    },
    other:{
        type: Array
    },
    image:{
        type: String,
        default: "empty.jpg"
    },
    loggedIn:{
        type: Boolean,
        default:false
    }
},{timestamps:true});

// UserSchema.pre('save', function(next) {
//     if(!this.isModified('password'))
//         return next()
//     bcrypt.hash(this.password,10,(err,passwordHash) => {
//         if(err)
//             return next(err);
//         this.password = passwordHash;
//         next();
//     })
// });

// UserSchema.methods.comparePassword = function(password, cb){
//     bcrypt.compare(password,this.password,(err,isMatch) => {
//         if(err)
//             return cb(err);
//         else{
//             if(!isMatch)
//                 return cb(null,isMatch);
//             return cb(null,this);
//         }
//     })
// }

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;