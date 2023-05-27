const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add name"]
    },
    email:{
        type:String,
        require:[true, "Please add email"],
        unique:[true,'Email address already registered']
    },
    password : {
        type:String,
        required:[true,"Please add password"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('admin_data',adminSchema);