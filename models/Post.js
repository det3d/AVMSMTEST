const mongoose = require('mongoose');

//schema - describe how you data is/looks
const PostSchema = mongoose.Schema({
  cpu: {
    type: Number,
    required: true
  },
  memory: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: false
  },
  bootup: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Posts', PostSchema);