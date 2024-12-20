//create server
const express=require('express');
const app=express();
app.use(express.json())
require('dotenv').config();
const PORT=process.env.PORT||4000;
const routes=require('./routes/allRoutes');
app.use('/api/v1',routes);
//db connection
const dbConnect=require('./config/database')
dbConnect();
//server start
app.listen(PORT,()=>{
    console.log(`app listen at port no ${PORT}`);
})
