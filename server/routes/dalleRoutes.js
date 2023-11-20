import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';

//To make sure our environment variables are indeed being populated.
dotenv.config();

const router = express.Router();

//This is to set a new environment variable.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

//To test this router properlly, we can add a Demo Route.
router.route('/').get((req, res) => {
    res.send("Hello from DALL-E!");
})

//The route that based on the prompt, will return an AI generated image.
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        //To get the image out of the response.
        const image = aiResponse.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error.message || 'Something went wrong')
    }
})

export default router;