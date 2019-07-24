const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//require('dotenv/config');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
//import routes
const postsRoute = require('./routes/posts');

//middleware
app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('we are on home url');
});

//connect to db
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