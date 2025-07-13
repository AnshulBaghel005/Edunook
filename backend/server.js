//create server
const express=require('express');
const app=express();
const Cors=require('cors');
app.use(Cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json())
require('dotenv').config();
const PORT=process.env.PORT||4000;
const routes=require('./routes/allRoutes');
app.use('/api/v1',routes);

//db connection
const dbConnect=require('./config/database')
dbConnect();
//cloudinary connection
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();
//server start
app.listen(PORT,()=>{
    console.log(`app listen at port no https://localhost${PORT}`);
})
