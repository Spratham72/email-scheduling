const mongoose=require('mongoose');
require('dotenv').config();
const connect=async()=>{
    await mongoose.connect("mongodb+srv://pratham:city@cluster0.fsi7d.mongodb.net/schedules");
}
module.exports=connect;