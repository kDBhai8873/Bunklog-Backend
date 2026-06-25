import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bunkLog');
        console.log(`Database is Successfully Connected`);
        
    } catch (error) {
        console.log(error)
    }
    
}


export default connectDb


