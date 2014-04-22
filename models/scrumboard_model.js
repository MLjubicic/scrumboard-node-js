	// Various models from the internet (don't know where from anymore)

	var Task = {
	  tasks: [], // initialize empty tasks array
	  last_id: 1, // initializing the task ID manually
	  getNextId: function () {
		this.last_id += 1; // Increment to next task
		return this.last_id;
	  },

	  add: function (data) {
		var data = this.clone(data);
		var id = this.getNextId();
		data.id = id;
		this.tasks.push(data);
		return data;
	  },

	  update: function(data) {
		for (var i = 0; i < this.tasks.length; i++) {
		  if (this.tasks[i].id == data['id']) {
			Task.merge(this.tasks[i], data);
			return this.tasks[i];
		  }
		}
		return void 0;
	  },

	  find: function (id) {
		for (var i = 0; i < this.tasks.length; i++) {
		  if (this.tasks[i].id == id) {
			return this.tasks[i];
		  }
		}
		return void 0;
	  },

	  remove: function (id) {
		for (var i = 0; i < this.tasks.length; i++) {
		  if (this.tasks[i].id == id) {
			var task = this.tasks[i];
			this.tasks.splice(i, 1);
			return task; // remove element and return it
		  }

		}
		return void 0;
	  },

	  all: function () {
		return this.tasks;
	  },

	  clearAllEntries: function () {
		this.tasks = []; // emptying the array
		this.last_id = 0; // emptying the counter
	  }
	};


	exports.getAllEntries = function () {
	  return Task.all();
	};


    exports.clearAllEntries = function () {
        return Task.clearAllEntries();
    };


    exports.find = function (id) {
        return Task.find(id);
    };

    exports.update = function (data) {
        return Task.update(data);
    };

    exports.create = function (data) {
        return Task.add(data);

    };



	exports.remove = function (id) {
	  return Task.remove(id);
	};


