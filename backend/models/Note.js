const mongoose = require('mongoose');
const { Schema } = mongoose;



const NotesSchema = new Schema({

   user:{                        //We want to associate the notes with the user so that others cannot view the notes of somebody else.

      type: mongoose.Schema.Types.ObjectId,    //This refers to the userID
      ref: 'user'

   },

   title:{

    type:String,
    
    required:true
   },

   description:{

    type:String,

    required:true,

   },

   tag:{

    type:String,

    default:"General"

    
   },

   date:{

    type:Date,

   default: Date.now
   },

  });
  module.exports = mongoose.model('Note', NotesSchema)  // This name "Note" is assigned to the collection created in mongoDB compass.