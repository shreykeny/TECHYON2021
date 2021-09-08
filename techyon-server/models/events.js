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
    description:{
        type: String,
        required: true,
        min: 20,
    }
    } ,{
        timestamps: true
    }
   
  );
  var events = mongoose.model('events',EventSchema);
  module.exports =events;