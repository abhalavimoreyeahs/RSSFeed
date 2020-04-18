const cron = require('node-cron');
const helper = require('./helper');

cron.schedule('*/1 * * * *', async () => { 
    try{
      await helper.saveFeed();
    }catch(error){
       console.log('Error:',error);
    }
})