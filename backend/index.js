const express=require('express');
const data=require('./data')
require('./db/conn')
const userRouter=require('./routes/user.routes')
const app=express();
const port =8000;
app.use(userRouter)
app.get('/',(req,res)=>{
  res.send("Hello and welcome")
})
app.get('/fetch-details',async(req,res)=>{

})
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
})