import mongoose from "mongoose";

export const connectToDb = (connectionString: string) => {
    return mongoose.connect(connectionString)
}