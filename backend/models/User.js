const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({

   name:{

    type:String,
    
    required:true
   },

   email:{

    type:String,

    required:true,

    unique: true
   },

   password:{

    type:String,

    required:true
   },

   date:{

    type:Date,

    default: Date.now
   },

  });
  //module.exports = mongoose.model('user', UserSchema)
  const User = mongoose.model('user', UserSchema)  

  
  User.createIndexes()                      //The .createIndexes() function is a method in the MongoDB Node.js driver that allows
                                           // you to create indexes on one or more fields of a MongoDB collection.
                                          // syntax -> createIndex(indexName, keyPath)

  module.exports = User