const mongoose = require('mongoose');
const { Schema } = mongoose;

const Feeds = new Schema({
    title:{
        type:String,
        default:null,
    },
    description:{
        type:String,
        default:null,
    },
    pubDate:{
        type:String,
        default:null,
    },
    link:{
        type:String,
        default:null,
    },
    guid:{
        type:String,
        default:null,
    },
    createdAt:{
        type:Number,
        default:Date.now()
    }
},{ timestamps: true } )

module.exports = mongoose.model('Feeds', Feeds);