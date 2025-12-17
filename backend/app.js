const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error(`DB connection error: ${err}`);
    });
