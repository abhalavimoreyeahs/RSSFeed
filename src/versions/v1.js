const feedRoutes = require('../routes/v0.1/feed.routes');

module.exports = function (app) {
  app.use('/v0.1/', [
    feedRoutes,
  ]);
};
