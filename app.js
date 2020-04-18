const express = require('express');
require('dotenv').config()
const app = express();

const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const cors = require('cors');
app.engine('html', require('ejs').renderFile);

require('./src/database/mongo');
require('./src/utils/v0.1/cronjob');

const FeedFunction = require("./src/utils/v0.1/functions")
app.get('/', async (req, res) => {
  try {
    let data = await FeedFunction.getFeed();
    if(data.success){
      return res.render('feeds.html', {result:data.result});
    }else{
      // need to handle
    }
  }catch(error){
    console.log("error:",error);
    return res.status(400).json("sorry unable to fetch request")
  }

});

app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

 require('./src/versions/v1')(app);

// show warnings
process.on('warning', e => consoleHelpers.warn(e.stack));
app.listen(port, () => {
  console.log(`Server running on port: ${port}`); 
});

module.exports = app;
