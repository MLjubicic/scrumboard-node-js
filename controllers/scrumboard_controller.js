/*
* Functions for various request/response access patterns to the node.js server
*/

// Get ALL
exports.index = function(app, req, res) {
  var tasks = app.models.task.getAllEntries();
  res.json( tasks );
};

// GET, ADD, UPDATE, REMOVE specific tasks
exports.show = function(app, req, res) {
  var task = app.models.task.find(req.params.id);
  res.json( task );
};

exports.update = function(app, req, res) {
    var task = app.models.task.update(req.body);
    res.json( task );
};
exports.create = function(app, req, res) {
  var task = app.models.task.create(req.body);
  res.json( task );
};

exports.remove = function(app, req, res) {
  var task = app.models.task.remove(req.params.id);
  res.json( task );
};