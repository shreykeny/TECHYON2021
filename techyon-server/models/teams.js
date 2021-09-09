const mongoose =require('mongoose')

const TeamSchema=new mongoose.Schema({
    teamName:{
        type: String,
        unique: true,
        required: true,
        min: 6
    },
    members:Array,
    college:{
        type: String,
        default: "PCCE",
        enum: ["PCCE","DBCE", "NIT","GEC","RIT","CHOWGULE"]
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true,
    },
    } ,{
        timestamps: true
    }
   
  );
  module.exports= mongoose.model('teams',TeamSchema);
  