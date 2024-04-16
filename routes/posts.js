const express = require('express');
const Post = require('../models/post');

const router = express.Router();


// A sample route in your Express app (backend)
app.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      } else {
          res.json(posts);
      }
  });
});


// Get All Posts
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Create New Post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  res.json(savedPost);
});

// Get Specific Post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const result = await Post.findByIdAndDelete(req.params.id);
  res.json(result);
});

// Update Post
router.patch('/:id', async (req, res) => {
  const result = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(result);
});

module.exports = router;
