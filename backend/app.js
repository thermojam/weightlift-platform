const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const PORT = 3001;
const app = express();
const MONGO_URL = process.env.MONGO_URL;

const distPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error(`DB connection error: ${err}`);
    });
