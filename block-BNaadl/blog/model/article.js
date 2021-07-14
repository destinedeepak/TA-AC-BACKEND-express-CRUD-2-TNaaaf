var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    address:String,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
})

module.exports = mongoose.model('Article', articleSchema);