const axios = require('axios');
const xml = require("xml-parse");
const parser = require('xml2json');
const mongoose = require("mongoose");
//const FeedModel =  mongoose.model("Feeds");
const FeedModel = require('../../models/feed.model');
const FeedFunction = require('./functions')

module.exports.saveFeed = async (req, res) => {
    try {

        let data = await axios.get(`https://timesofindia.indiatimes.com/rssfeedstopstories.cms`)

        console.log("data:", data);
        if (data.status == 200) {
            // xml parse //////////////////////
            var parsedXML = await parser.toJson(data.data); // parsing XML to json 
            /////////////////end //////////////
            var validJson = await JSON.parse(parsedXML)   // converting string to Valid Json
            try {
                if (validJson.rss) {
                    if (validJson.rss.channel) {
                        if (validJson.rss.channel.item) {
                            if (validJson.rss.channel.item.length > 0) {
                                let feed = validJson.rss.channel.item;
                                let saveFeed = await FeedModel.bulkWrite(
                                   
                                    feed.map((element) =>
                                        ({
                                            updateOne: {
                                                filter: { pubDate: element.pubDate },
                                                update: {
                                                    $set:
                                                    {
                                                        title: element.title ? element.title : null,
                                                        description: (typeof element.description === 'object' ? null: element.description),
                                                        pubDate: element.pubDate,
                                                        link: element.link,
                                                        guid: element.guid,
                                                        createdAt: FeedFunction.convertTime(element.pubDate)
                                                    }
                                                },
                                                upsert: true
                                            }
                                        })
                                    ));
                                    console.log('Save feed result in DB:', saveFeed);
                            }

                        }
                    }
                }
            } catch (error) {
                console.log('parse error:', error);
            }

        } else {
            console.log('sth went wrong, status code:', data.status)
        }

    }
    catch (error) {
        console.log('error:', error);
    }
}