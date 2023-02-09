import express, { json } from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
// import {homeRouter} from "./routers/home";
// import {childRouter} from "./routers/child";
// import {giftRouter} from "./routers/gift";
// import './utils/db';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(json()); // Content-type: application/json

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

// app.use('/', async (req, res) => {
//     throw new ValidationError('HAHAHA');
// });
// app.use('/child', childRouter);
// app.use('/gift', giftRouter);

app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});