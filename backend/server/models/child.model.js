const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength: [3, "Name needs to be at least 3 characters"],
        required: [true, "Name is required"]
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

const Child = mongoose.model('Child', ChildSchema);

module.exports = Child;