import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true); //Useful when working with search functionality.
  //connect database
  mongoose.connect(url)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(`FAILED TO CONNECT WITH MONGODB - ${err}`));
};

export default connectDB;