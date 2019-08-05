const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Post = require('../models/Diagnostics');

router.use(bodyParser.json());

//gets back all the posts
router.get('/', async (req, res) => {
  //res.send('we are on posts route');
  try {
    const posty = await Post.find();
    //console.log('GET: ' + posty);
    res.json(posty);
  } catch (err) {
    res.json({
      message: err
    });
  }
  console.log('...after GET Schema called...');
});

//submits a post
router.post('/', async (req, res) => {
  const post = new Post({
    name: req.body.name,
    data: req.body.data,
    date: req.body.date
  });
  //console.log(things);

  try {
    const savedPost = await post.save();
    //res.type('json');
    res.json(savedPost);
  } catch (err) {
    res.send({
      message: err
    });
  }
});

//submits array of post
//https://stackoverflow.com/questions/31254578/iterate-over-json-array-in-node-js
router.post('/array', async (req, res) => {
  console.log(req.body);
  var tables = req.body;
  var savedPost = [];
  console.log(tables);

  for (var i = 0; i < tables.length; i++) {

    var name1 = tables[i].name;
    var data1 = tables[i].data;
    var date1 = tables[i].date;

    const post = await new Post({
      name: name1,
      data: data1,
      date: date1
    });

    //try to push each tablename to db
    savedPost.push(post);
    post.save();
  }
  res.json(savedPost);
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
// router.patch('/:postId', async (req, res) => {
//   try {
//     await Post.updateOne({
//       _id: req.params.postId
//     }, {
//       $set: {
//         cpu: req.body.cpu,
//         memory: req.body.memory,
//         temperature: req.body.temperature
//       }
//     });
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({
//       message: err
//     });
//   }
// });

module.exports = router;

// request.body.forEach(function(obj) {
//   var transfer = new Transfer(obj);
//   transfer.save();
// });