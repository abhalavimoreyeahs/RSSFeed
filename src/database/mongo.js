const mongoose = require('mongoose');
const database_URL = process.env.DATABASE_URL;
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    database_URL = 'mongodb://localhost:27017/RSSFeed';
}

mongoose.connect(database_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then( 
  () => { console.log('Mongo Server Connected Successfully...!', database_URL ); }, 
  (err) => { console.error('Failed to connect to MongoDB:', err.message); /** handle initial connection error */ }
);

// schema registered here
require('../models/feed.model');


