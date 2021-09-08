const mongoose =require('mongoose')

const member = new mongoose.Schema({
    name:{  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members',
    required: true 
    }
});

const TeamSchema=new mongoose.Schema({
    teamName:{
        type: String,
        unique: true,
        required: true,
        min: 6
    },
    members:[member],
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
  