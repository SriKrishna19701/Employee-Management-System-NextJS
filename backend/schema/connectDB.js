const mongoose = require('mongoose');
require('dotenv').config()
const connectDb = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database Has Been Connected Successfully")})
.catch((err)=>{
    console.log(`Error occured ${err}`)
});

export default connectDb ;