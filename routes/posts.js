const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//gets back all the posts
router.get('/', async (req, res) => {
  //res.send('we are on posts');
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//submits a post
router.post('/', async (req, res) => {
  console.log(req.body);
  const post = new Post({
    cpu: req.body.cpu,
    memory: req.body.memory,
    temperature: req.body.temperature
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//gets post by post id
router.get('/:postId', async (req, res) => {
  //console.log(req.params.postId);
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({
      message: err
    });
  }

});

//deletes post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({
      _id: req.params.postId
    });
    res.json(removedPost);
  } catch (err) {
    res.json({
      message: err
    });
  }

});

//updates a post
router.patch('/:postId', async (req, res) => {
  try {
    await Post.updateOne({
      _id: req.params.postId
    }, {
      $set: {
        cpu: req.body.cpu,
        memory: req.body.memory,
        temperature: req.body.temperature
      }
    });
    res.json(updatedPost);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

module.exports = router;