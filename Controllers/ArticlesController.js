var mongoose = require("mongoose");
var db = require("../models");
var sources = require('../Sites')
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/webScraper";


const controller = {

    getSavedArticles: function(req, res, next)
    {
        mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, error => 
        {
            if(error) return next(createError(500, error));

            db.Article.find({}, (error, docs) => 
            {
                if(error) return next(createError(500));

                res.jason(docs);
                mongoose.disconnect();
            });
        });
    },

    getScrappedArticles: function(req, res)
    {
        var topic = req.params.topic ? req.params.topic.trim().toLowerCase() : null;
    
        if(topic && sources.topics[topic] !== undefined)
        {
            sources.getArticles(topic).then(function(articles) 
            {
                res.json({ title: topic.capitalize(), articles: articles });
            });
        }
        else if(topic)
        {
            res.json(false);
        }
        else
        {
            sources.getArticles().then(function(articles) 
            {
                res.json({ title: sources.topics.news.capitalize(), articles: articles });
            });
        }
    },
    
    postArticle: function(req, res) 
    {
        mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, error => 
        {
            if(error) return res.json(false);

            let newArticle = new db.Article({
                headline : req.body.headline,
                link : req.body.link,
                summary : req.body.summary,
                section : req.body.section,
                imgLink : req.body.imgLink,
                source : req.body.source
            });        

            newArticle.save((error, article) => 
            {
                if (error) return res.json(false);

                mongoose.disconnect();
                res.json(article);
            });
        });
    },

    deleteArticle: function(req, res) 
    {
        if(!req.body.id) return res.json(false);

        mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, error => 
        {
            if(error) return res.json(false);       

            db.Article.findByIdAndRemove(req.body.id, (error) => 
            {
                if (error) return res.json(false);

                mongoose.disconnect();
                res.json(true);
            });
        });
    }
}

module.exports = controller;