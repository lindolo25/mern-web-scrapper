var async = require("async");
var sourceList = [];
sourceList.push(require("../sites/miamiherald"));
//sourceList.push(require("../sites/miamiherald"));

var sources = {
    get count()
    {
        return sourceList.count;
    },

    topics: {
        news: "news",
        sports: "sports",
        politics: "politics",
        entertainment: "entertainment"
    },

    getArticles : function(topic = this.topics.news)
    {
        return new Promise(function(resolve, reject) 
        {
            var allArticles = [];        
            async.concat(sourceList, async function(source, callback) 
            {
                topicLink = source.getTopicLink(topic);
                if(topicLink !== undefined)
                {
                    var sourceArticles = await source.getArticles(topicLink);
                    return sourceArticles;
                }
                else return [];
            }, function(err, allArticles)
            { 
                resolve(allArticles);
            });
        });
    }
}

module.exports = sources;