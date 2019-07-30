const mongoose = require('mongoose');

//schema - describe how you data is/looks
const DiagnosticsSchema = mongoose.Schema({
    homescreen1: {
        cpu: Number,
        memory: Number
    },
    homescreen2: {
        cpu: Number,
        memory: Number
    },
    castingapp: {
        cpu: Number,
        memory: Number
    },
    btservice: {
        cpu: Number,
        memory: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Diagnostics', DiagnosticsSchema);