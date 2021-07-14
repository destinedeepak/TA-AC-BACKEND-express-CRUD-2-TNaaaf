var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {type: String, required:true},
    description: String,
    tags: [String],
    author: {type: String, required:true},
    address:String,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    comments:[{type: Schema.Types.ObjectId, ref:"Comment"}]
}, {timestamps: true})

module.exports = mongoose.model('Article', articleSchema);