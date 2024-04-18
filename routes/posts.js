const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// Get All Posts
// Corrected version
router.get('/api/posts', async (req, res) => {
  try {
      const posts = await Post.find();
      res.status(200).json(posts);
  } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// Create New Post
router.post('/createpost', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Specific Post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete Post
router.delete('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update Post
router.patch('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
