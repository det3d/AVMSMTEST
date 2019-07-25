const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Post = require('../models/Post');
const ArrayPost = require('../models/ArrayPost');



app.use(bodyParser.json());

//gets back all the posts
router.get('/', async (req, res) => {
  //res.send('we are on posts route');
  try {
    const posty = await Post.find();
    console.log(posty);
    res.json(posty);
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

//submits array of post
//https://stackoverflow.com/questions/31254578/iterate-over-json-array-in-node-js
router.post('/array', async (req, res) => {
  //console.log(req.body);
  var tables = req.body;
  var savedPost = [];
  console.log(tables);

  for (var i = 0; i < tables.length; i++) {
    var cpu = tables[i].cpu;
    var mem = tables[i].memory;
    var temp = tables[i].temperature;
    console.log(cpu);
    console.log(mem);
    const post = new Post({
      cpu: cpu,
      memory: mem,
      temperature: temp
    });
    //try to push each tablename to db
    savedPost.push(post);
    post.save();
  }
  res.json(savedPost);
});


//gets post by post id
// router.get('/:postId', async (req, res) => {
//   //console.log(req.params.postId);
//   try {
//     const post = await Post.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({
//       message: err
//     });
//   }
// });

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