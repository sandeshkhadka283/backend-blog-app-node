const express = require('express');
const Post = require('../models/post'); // Adjust the path to your Post model as necessary

const router = express.Router();

// Get All Posts
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send('An error occurred', err);
  }
});

// Create New Post
router.post('/api/createpost', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Specific Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update Post
router.patch('/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
