const mongoose = require('mongoose')

const liveurl = 'mongodb+srv://monu1999june:monu1234@cluster0.m4jdf.mongodb.net/BlogPortal?retryWrites=true&w=majority&appName=Cluster0'



const connectDB =()=>{
    return mongoose.connect(liveurl)
    
    .then(()=>{
        console.log("Database connected")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB