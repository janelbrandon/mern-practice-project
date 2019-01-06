const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
    name: String,
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
})

module.exports = mongoose.model('Song', Song)