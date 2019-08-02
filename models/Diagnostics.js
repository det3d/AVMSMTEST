const mongoose = require('mongoose');

//schema - describe how you data is/looks
const DiagnosticsSchema = mongoose.Schema({
    name: String,
    data: String,
    date: String
});

module.exports = mongoose.model('Diagnostics', DiagnosticsSchema);