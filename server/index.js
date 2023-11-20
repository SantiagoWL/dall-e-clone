//External Packages
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config(); //This allows us to pull our environment variables from our dotenv file.

const app = express(); //Initialize our express app.
//Additional Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); //Accepts an option object where we can set the limit to 50mb.

//API endpoints that we can connect to from our frontend side.
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//This ensures our app is running once we visit the URL of our server.
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E');
})

//This is to run the app.
const startServer = async () => {
    //connect to MongoDB, this can fail so created a try-catch block
    try {
        connectDB(process.env.MONGODB_URL); //While this is empty the app will crash, this needs to be connected to atlas database(https://www.mongodb.com/atlas/database)
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
};

startServer();