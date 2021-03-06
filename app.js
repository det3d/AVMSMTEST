const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3004;

//const Post = require('./models/Post');
//import routes
const postsRoute = require('./routes/posts');

//require('dotenv/config');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

//middleware
app.use('/posts', postsRoute);

//Routes
app.get('/', async (req, res) => {
    res.send('we are on home url');
    //
    // try {DB
    //     const posts = await Post.find();
    //     console.log(posts);
    //     res.json(posts);
    // } catch (err) {
    //     res.json({
    //         message: err
    //     });
    // }
    //
});
app.get('/chart', async (req, res) => {
    res.sendFile('/ploty-chart.html', {
        root: __dirname
    })

});
//res.sendFile('views/test.html', {root: __dirname })


//connect to db
//https://hackernoon.com/deploying-a-node-app-on-amazon-ec2-d2fb9a6757eb
//You don’t need “dotenv” to read the environment variables. Set the variables in your .bash_profile you should be able to see that process.env.MYAPIKEY no problem.
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db');
});

//start listening to server
app.listen(PORT);
// process.env.PORT || 
// process.env.DB_CONNECTION