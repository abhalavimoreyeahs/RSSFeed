const express = require('express');
const router = express.Router();
const RssFeedController = require('../../controller/v0.1/feed.controller');

router.get('/getAllFeeds',RssFeedController.getAllFeeds);

module.exports = router;