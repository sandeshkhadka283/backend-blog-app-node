// Load environment variables
require('dotenv').config();

// Import necessary libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');

// Create an Express application
const app = express();

// Dynamic CORS configuration based on environment
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Default to localhost if CORS_ORIGIN not set
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true, // Enable credentials
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

// Apply CORS middleware with the above options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Routes setup
app.use('/api', postsRoute);

// Basic route for homepage
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS-enabled for: ${process.env.CORS_ORIGIN}`);
});
