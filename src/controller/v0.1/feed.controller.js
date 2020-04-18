const mongoose = require('mongoose');
const FeedModel = require('../../models/feed.model')

const RssfeedController = {

    getAllFeeds: async(req,res)=>{   
        try{
        let getAllFeeds = await FeedModel.find({}).sort({ createdAt: -1});
        if(getAllFeeds){
            return res.status(200).json({ success: true, message:"rssfeed", result: getAllFeeds});
          
        }else{
            return res.status(400).json({ success: false, message:"unable to get rssfeed", result: getAllFeeds});
        }
        }
        catch(error){
            console.log('Error:',error);
            return res.status(500).json({ success: true, message:"Server Error", error: error});
        }
    } 

}

module.exports = RssfeedController;