const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const schema = new Schema({
    name: {
        type: String
    },
    anime: {
        type: String
    },
    img: {
        type: String
    },
    sex: {
        type: String
    },
    kiss: {
        type: Number
    },
    marry: {
        type: Number
    },
    kill: {
        type: Number
    }
})

module.exports = mongoose.model('Character', schema)