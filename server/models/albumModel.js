const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
    name: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
})

module.exports = mongoose.model('Album', Album)