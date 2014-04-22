$(function () {

// Initializing App (MVC)
    App = {};
    App.Model = {};
    App.View = {};
    App.Collection = {};



// Model with Backbone and Defaults
    App.Model.Task = Backbone.Model.extend({
    });

    App.Collection.TasksCollection = Backbone.Collection.extend({
        model: App.Model.Task,
        url: '/tasks',

        getOpenTask: function() {
            return this.where({status: 'open'});
        },

        getInProgressTask: function(){
            return this.where({status: 'In Progress'});
        },
        getCompletedTask: function() {
            return this.where({status: 'completed'});
        },

        open: function() {
            this.fetch({async:false, reset: true});
            this.reset();
            this.trigger('reload');
        },
        inprogress: function() {
            this.fetch({async:false, reset: true});
            this.reset(this.where({status: 'In Progress'}));
            this.trigger('reload');
        },
        completed: function() {
            this.fetch({async:false, reset: true});
            this.reset(this.where({status: 'completed'}));
            this.trigger('reload');
        },


        all: function() {
            this.fetch({async:false, reset: true});
            this.reset();
            this.trigger('reload');
        }
    });


    // View
    App.View.TaskView = Backbone.View.extend({

        el: '#Scrum',

        template: _.template($('#item-template').html()),

        events: {
            "blur .edit": "close",

            "click .move_right": "move_right",
            "click .move_left": "move_left",

            "dblclick .title-view": 'editTitle',
            "blur .title-edit": 'closeTitle',

            "dblclick .description-view": 'editDescription',
            "blur .description-edit": 'closeDescription',

            "dblclick .assignee-view": 'editAssigned',
            "blur .assignee-edit": 'closeAssigned',

            "dblclick .estimation-view": 'editEstimation',
            "blur .estimation-edit": 'closeEstimation',

            "click .deleteItem": 'deleteItem'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            $('#task-list-open').html(this.template({tasks: this.model.getOpenTask()}));
            $('#task-list-inprogress').html(this.template({tasks: this.model.getInProgressTask()}));
            $('#task-list-completed').html(this.template({tasks: this.model.getCompletedTask()}));
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },



        editTitle: function(event){
            $(event.currentTarget).parent().addClass("title-to-edit");
            $(event.currentTarget).focus();
        },

        closeTitle: function (event) {
            var value = $(event.currentTarget).val();
            if (!value) {
                this.clear();
            } else {
                this.model.get($(event.currentTarget).parent().data('model-id')).save({title: value});
                $(event.currentTarget).parent().removeClass("title-to-edit");
            }
        },
        editDescription: function(event){
            $(event.currentTarget).parent().addClass("description-to-edit");
            $(event.currentTarget).focus();
        },
        closeDescription: function (event) {
            var value = $(event.currentTarget).val();
            if (!value) {
                this.clear();
            } else {
                this.model.get($(event.currentTarget).parent().data('model-id')).save({description: value});
                $(event.currentTarget).parent().removeClass("description-to-edit");
            }
        },
        editEstimation: function(event){
            $(event.currentTarget).parent().addClass("estimation-to-edit");
            $(event.currentTarget).focus();
        },
        closeEstimation: function (event) {
            var value = $(event.currentTarget).val();
            if (!value) {
                this.clear();
            } else {
                this.model.get($(event.currentTarget).parent().data('model-id')).save({estimation: value});
                $(event.currentTarget).parent().removeClass("estimation-to-edit");
            }
        },
        editAssigned: function(event){
            $(event.currentTarget).parent().addClass("assignee-to-edit");
            $(event.currentTarget).focus();
        },
        closeAssigned: function (event) {
            var value = $(event.currentTarget).val();
            if (!value) {
                this.clear();
            } else {
                his.model.get($(event.currentTarget).parent().data('model-id')).save({assignee: value});
                $(event.currentTarget).parent().removeClass("assignee-to-edit");
            }
        },


        move_right: function(event) {
            var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
            if (actualModel.get('status') == 'open'){
                actualModel.save({status: 'In Progress'});
                actualModel.trigger('reload');


            }else if(actualModel.get('status')  == 'In Progress'){
                actualModel.save({status: 'completed'});
                actualModel.trigger('reload');
            }

        },

        saveChanges: function(event) {
            var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
            actualModel.update();
            actualModel.trigger('reload')
        },

        move_left: function(event) {
            var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
            if (actualModel.get('status') == 'In Progress'){
                actualModel.save({status: 'open'});
                actualModel.trigger('reload');
            }
            else if(actualModel.get('status') == 'completed'){
                actualModel.save({status: 'In Progress'});
                actualModel.trigger('reload');
            }
        },
        deleteItem: function(event){

            var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
            actualModel.destroy();
        }
    });

    // Routing
    var TaskRouter = Backbone.Router.extend({
        routes: {
            'open': 'showOpenTasks',
            'inprogress': 'showInProgressTasks',
            'completed' : 'showCompletedTasks',
            '' : 'showAllTasks'
        },

        setApp: function(app) {
            this.app = app;
        },

        showAllTasks: function() {
            this.app.showAll();
        },
        showOpenTasks: function() {
            this.app.showOpen();
        },
        showInProgressTasks: function() {
            this.app.showInProgress();
        }

    });

    // View
    var TaskList = Backbone.View.extend({
        el: '#scrum_application',

        events: {
            'click #add-item': 'createItem'
        },

        initialize: function () {
            this.tasks =  new App.Collection.TasksCollection();
            this.input = $('#new-task-title');
            this.description = $('#new-task-description');
            this.estimation = $('#new-task-estimation');
            this.assignee = $('#new-task-assigned');
            this.list = $('#task-list');

            this.listenTo(this.tasks, 'add', this.addItem);
            this.listenTo(this.tasks, 'all', this.addItem);
            this.listenTo(this.tasks, 'reload', this.reload);
            this.tasks.all();
            this.tasks.fetch({async:false, reset: true});

        },

        addItem: function () {
            var that = this;
            $('#add-item', this.$el).click(function() {
                that.createItem();
            });

            var taskView = new App.View.TaskView({ model: this.tasks });
            this.list.append(taskView.render().el);
        },

        reload: function() {
            this.list.empty(); // clear the DOM element
            this.addAll();
        },

        createItem: function () {
            if (!this.input.val()) return;

            var title_field = this.input.val();
            var description_field = this.description.val();
            var assignee_field = this.assignee.val();
            var estimation_field = this.estimation.val();

            this.input.val('');
            this.description.val('');
            this.assignee.val('');
            this.estimation.val('');
            this.tasks.create({title: title_field, description: description_field, estimation: estimation_field, assignee: assignee_field, status: 'open'});
        },
        showOpen: function() {
            this.tasks.open();
        },
        showInProgress: function() {
            this.tasks.inprogress();
        },
        showAll: function() {
            this.tasks.all();
        }
    });




    // Get this party started
    var taskList = new TaskList();
    var router = new TaskRouter();
    router.setApp(taskList);
    Backbone.history.start();
});