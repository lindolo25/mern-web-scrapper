var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    
    date: { type: Date, default: Date.now },

    headline: { type: String, required: true },
    
    imgLink: { type: String, required: false },
    
    link: { type: String, required: true },
    
    section: { type: String, required: false },
    
    source: { type: String, required: false },
    
    summary: { type: String, required: true }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;