var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(function( $ ) {
	'use strict';

    App.Routers.AppRouter = Backbone.Router.extend({

        routes: {
            '': 'index'
        },

        initialize: function(options) {
        	// Define a global state
        	App.global = Backbone.Model.extend({});
        	App.globalState = new App.global;
        
        	// Define collection of stories
        	App.Collections.stories = new App.Collections.Stories();
			
        	// Add views
        	App.Views.share = new App.Views.Share();
			App.Views.shared = new App.Views.Shared({
				collection: App.Collections.stories
			});
			
			// Bind changing of stories collections to views
			App.Collections.stories.bind("add", App.Views.shared.addStory, this);
        	App.Collections.stories.on("reset", function(collection, response){
				App.Views.shared.addStories();
			});
        },

        index: function() {
        	App.Collections.stories.url = 'assets/php/crud.php';
        	App.Collections.stories.fetch();
        }
    });
});