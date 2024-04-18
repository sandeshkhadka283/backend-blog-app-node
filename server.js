require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODBURI);  // Check if it prints a correctly formatted URI

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

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



app.use('/api', postsRoute);  // Simplified routing prefix

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
