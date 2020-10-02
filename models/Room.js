const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        name: String,
        posts: [String],
        createdBy: String
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model('Room', roomSchema)