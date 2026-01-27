import express, { Request, Response } from "express";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
}));





// ! Default Get.
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Food Hub Server.')
});


// ! Server Listing.
app.listen(5000, () => {
    console.log(`Food Hub Server listening on port 5000`)
});