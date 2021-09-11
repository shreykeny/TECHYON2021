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
    position:{
        type: String,
        default: "Solo",
        enum: ["Leader","Member", "Solo"]
    },
    email:{
        type: String,
        required: true,
        min: 6
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true,
    }
    } ,{
        timestamps: true
    }
   
  );
  module.exports= mongoose.model('members',MemberSchema);