const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

require('dotenv/config');

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
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db');
});

//start listening to server
app.listen(PORT);
// process.env.PORT || 