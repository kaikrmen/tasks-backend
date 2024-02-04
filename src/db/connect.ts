import mongoose from 'mongoose';

export const connect = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks'; 
        await mongoose.connect(mongodbUri)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};