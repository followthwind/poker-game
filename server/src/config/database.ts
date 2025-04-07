import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
 
const connectDB = async () : Promise<void> =>{
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poker');
    console.log(`MongoDB Connected: ${conn.connection.host}, Port: ${conn.connection.port}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
};

export default connectDB;