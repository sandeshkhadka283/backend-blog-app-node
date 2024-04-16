const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
