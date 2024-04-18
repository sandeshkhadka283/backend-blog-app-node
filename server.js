require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODBURI);

const express = require('express');
const cors = require('cors');
const postsRoute = require('./routes/posts');

require('dotenv').config();

const app = express();

// CORS configuration - Allow requests from your frontend domain
app.use(cors({
    origin: 'http://localhost:5000'  // This should match the URL of your frontend app
}));

app.use(express.json());  // For parsing application/json

// MongoDB connection setup should be here (not shown for brevity)

app.use('/api', postsRoute);  // Simplified routing prefix

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
