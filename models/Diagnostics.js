const mongoose = require('mongoose');

//schema - describe how you data is/looks
const DiagnosticsSchema = mongoose.Schema({
    homescreen1cpu: {
        type: Number,
        required: true
    },
    homescreen1memory: {
        type: Number,
        required: true
    },
    homescreen2cpu: {
        type: Number,
        required: true
    },
    homescreen2memory: {
        type: Number,
        required: true
    },
    castingappcpu: {
        type: Number,
        required: true
    },
    castingappmemory: {
        type: Number,
        required: true
    },
    btservicecpu: {
        type: Number,
        required: true
    },
    btservicememory: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Diagnostics', DiagnosticsSchema);