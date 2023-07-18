import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => console.log(`Database connected ${conn.connection.host}`))
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      process.exit(1);
    });
};

export default connectDB;
