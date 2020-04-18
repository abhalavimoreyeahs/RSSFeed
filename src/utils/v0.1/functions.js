const mongoose =require('mongoose');
const FeedModel = require("../../models/feed.model");
module.exports.getFeed = async ()=> {
  try{
    let getAllFeeds = await FeedModel.find().sort({ createdAt : -1});
    if(getAllFeeds){
        return { success: true, result: getAllFeeds }
    }else{
        return { success: false, result: getAllFeeds, error:"Feed not found"}
    }
  }catch(error){
      return { success: false, error: error}
  }
}

module.exports.convertTime = (time)=>{
    try{
        var a =time
        var b = a.split(' ')
        var date = (`${b[1]}-${b[2]}-${b[3]} ${b[4]}`)
        var timestamp = new Date(date).getTime();
        return timestamp;

    }catch(error){
        console.log(error);
        return Date.now();
    }
}