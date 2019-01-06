const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Artist = new Schema({
    name: String
})

module.exports = mongoose.model('Artist', Artist)