const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(cors())



app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Availaible routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
   console.log(`CloudBox backend listening on port http://localhost:${port}`)
 })

// const start = async () => {
//   try {
//     await connectToMongo();
//     app.listen(port, () => {
//       console.log(`Example app listening on port http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };