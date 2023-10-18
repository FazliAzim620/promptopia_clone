import mongoose from 'mongoose';
var isConnected =false;
export const connectToDB=async()=>{
 
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('Already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected=true
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}
 