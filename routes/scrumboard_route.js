// Dependency to scrumboard_controller
var controller = require('../controllers/scrumboard_controller');

module.exports = function(app) {

  // GET all tasks
  app.get('/tasks', function(req, res) {
      controller.index(app, req, res);
    }
  );

  
  // GET specific task
  app.get('/tasks/:id', function(req,res) {
    controller.show(app, req, res);
  });


    // PUT specific task
    app.put('/tasks/:id', function(req,res) {
        controller.update(app, req, res);
    });

  // POST to specific task
  app.post('/tasks', function(req,res) {
      controller.create(app, req, res);
  });

  // DELETE specfic task
  app.delete('/tasks/:id', function(req,res) {
    controller.remove(app, req, res)
  });
}