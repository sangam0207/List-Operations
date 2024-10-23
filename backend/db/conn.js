const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/List_Operation').then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("connection failed")
})