require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');  // Security middleware that adds some good security defaults
const postsRoute = require('./routes/posts');

const app = express();

// Enhanced CORS configuration with environmental awareness
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Dynamic based on environment
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
};
app.use(cors(corsOptions));
app.use(helmet()); // Adds additional security headers to your responses

app.use(express.json()); // Parses incoming requests as JSON

// Modular error handling for database connections
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => {
        console.error('Failed to connect to MongoDB, retrying in 5 seconds:', err);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use('/api', postsRoute);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS-enabled for: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`);
});
