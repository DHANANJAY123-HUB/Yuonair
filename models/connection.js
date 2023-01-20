const mongoose = require('mongoose')
mongoose.set('strictQuery',true);
//const url = "mongodb://localhost:27017/Yuonair"
mongoose.connect('mongodb+srv://user:user@cluster0.lcji4ad.mongodb.net/Yuonair?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
//mongoose.connect(url)
const db = mongoose.connection
console.log("Successfully connected to mongodb database")
module.exports = db
