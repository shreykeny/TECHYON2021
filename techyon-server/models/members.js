const mongoose =require('mongoose')
const MemberSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    department:{
        type: String,
        required: true,
        min: 8
    },
    phoneNo:{
        type: Number,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true,
        min: 6
    },
    } ,{
        timestamps: true
    }
   
  );
  module.exports= mongoose.model('members',MemberSchema);