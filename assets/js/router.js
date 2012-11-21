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
            '': 'index',
            ':id': 'story'
        },

        initialize: function(options) {
        	// Define a global state
        	App.global = Backbone.Model.extend({});
        	App.globalState = new App.global;
        },

        index: function() {
        	// Define collection of stories
        	App.Collections.stories = new App.Collections.Stories();
			
        	// Add views
        	App.Views.share = new App.Views.Share();
			App.Views.shared = new App.Views.Shared({
				collection: App.Collections.stories
			});
			
			// Bind changing of stories collections to views
        	App.Collections.stories.on("add", function(story, response){
				App.Views.shared.addStory(story);
			});
        	App.Collections.stories.on("reset", function(collection, response){
        		collection.each(function(story) {
					App.Views.shared.addStory(story);
				});
        		// Store oldest story id so we can load additional older ones later
        		App.globalState.set('oldestID', collection.last().id);
			});
        
        	App.Collections.stories.url = 'assets/php/crud.php';
        	App.Collections.stories.fetch();
        },
        
        story: function(id) {
	        var shareStory = new App.Models.Story();
	        shareStory.fetch({
	        	url: 'assets/php/crud.php?id=' + id,
		        success: function() {
			    	App.Views.shareStory = new App.Views.ShareStory({
				    	model: shareStory
			    	});
		        }
	        });
        }
    });
});