var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/Articles");
var topics = {
    news: "https://www.miamiherald.com/news/",
    sports: "https://www.miamiherald.com/sports/",
    politics: "https://www.miamiherald.com/politics/",
    entertainment: "https://www.miamiherald.com/entertainment/"
};

module.exports = {
    sourceName : "Miami Herald",

    getTopicLink: function(topic) 
    {
        return topics[topic];
    },

    getArticles: async function(topic)
    {
        var result = [];
        var response = await axios.get(topic).catch((error) => console.log(error));
        
        if(response === undefined) return result;

        var $ = cheerio.load(response.data);
        var articles =  $("#story-list article");        

        articles.each((i, article) => {
            var temp = new Article({});
            temp.headline = $(article).find("h4.title>a").text().trim();
            temp.link = $(article).find("h4.title>a").attr("href");
            temp.summary = $(article).find("p.summary").text().trim();
            temp.section = $(article).find("h2.kicker").text().trim();
            temp.imgLink = $(article).find("div.picture>a>img").attr("data-proxy-image");
            temp.imgLink = temp.imgLink !== undefined ? temp.imgLink.replace("LANDSCAPE_80", "LANDSCAPE_320") : null;
            temp.source = this.sourceName;
            result.push(temp);
        });

        return result;
    }
};