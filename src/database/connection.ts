import mongoose from "mongoose"
import config from "../config/config"

const connectDatabase = async () => {
    try {
        const base = config.DATABASE_URL
        await mongoose.connect(base);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default connectDatabase;