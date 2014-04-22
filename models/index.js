/*
* Models wrapper
*/

module.exports = function(app) {
  app.models = {}
  app.models.task = require('./scrumboard_model.js');
};
