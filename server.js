require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODBURI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoute = require('./routes/posts');


const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use('/posts', postsRoute);


// MongoDB Connection

mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
  console.log("")
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
