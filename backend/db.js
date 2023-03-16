const mongoose = require("mongoose") //require is used to include modules which exist in separate files.
const mongoURI = "mongodb://127.0.0.1:27017/cloudbox"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to Mongo sucessfully") //We could have also used async function await command instead of the
//                                                             // call back function to return a promise of the connection.
//     })
// }
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => console.log("connection success")).catch((err) => console.log(err));
  };

module.exports = connectToMongo

