
const mongoose = require("mongoose");


function connectToDb(){
    const mongoDBURL = "mongodb+srv://priyam6280:1234poiu@cluster0.5k5vx.mongodb.net/userdb"
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Connection succesfully");
})
.catch((err)=>{
    console.log("Connection Error :", err);
    
})

}

module.exports = connectToDb;