const mongoose = require('mongoose');
const schema = mongoose.Schema;


const AccountSchema = new schema({
    pseudo:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    verified:{
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        required:true
    }

},{timestamps:true}
);

module.exports =  mongoose.model('Account',AccountSchema);
