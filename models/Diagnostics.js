const mongoose = require('mongoose');

//schema - describe how you data is/looks
const DiagnosticsSchema = mongoose.Schema({
    date: {
        type: String
    },
    name: {
        type: String
    },
    data: [new mongoose.Schema({
        _id: false,
        Name: {
            type: String
        },
        Text: {
            type: Number
        }
    }, {
        strict: false
    })]
}, {
    strict: false
});

module.exports = mongoose.model('Diagnostics', DiagnosticsSchema);