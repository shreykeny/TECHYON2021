const mongoose =require('mongoose')

const TeamSchema=new mongoose.Schema({
    teamName:{
        type: String,
        unique: true,
        required: true,
        min: 6
    },
    members:Array,
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true,
        unique: true
    },
    } ,{
        timestamps: true
    }
   
  );
  module.exports= mongoose.model('teams',TeamSchema);
  