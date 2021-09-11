const mongoose =require('mongoose')

const EventSchema=new mongoose.Schema({
    eventName:{
        type: String,
        required: true,
        min: 6,
        unique: true 
    },
    hostedBy:{
        type: String,
        required: true,
        min: 8, 
    },
    college:{
        type: String,
        required: true,
        enum: ["Intra","Inter"]
    },
    description:{
        type: String,
        required: true,
        min: 20,
    },
    eventType:{
        type: String,
        default: "Solo",
        enum: ["Team","Solo"]
    }
    } ,{
        timestamps: true
    }
   
  );
  var events = mongoose.model('Events',EventSchema);
  module.exports =events;