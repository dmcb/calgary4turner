var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(function( $ ) {
	'use strict';

	App.Views.Story = Backbone.View.extend({
		className: "story",
		template: _.template($('#story-template').html()),
		
		events: {
		},
		
		initialize: function() {
			_.bindAll(this);
		},
		
		render: function() {
			var doc = {
				id: this.model.get('id'),
				name: this.model.get('name'),
				date: this.model.get('date'),
				story: this.model.get('story')
			}
			var renderedContent = this.template(doc);
			$(this.el).html(renderedContent).fadeIn('slow');
			return this;
		}
	});
	
	App.Views.Shared = Backbone.View.extend({
		el: "#shared",
		template: _.template($('#shared-template').html()),
		
		events: {
		},
		
		initialize: function() {
			_.bindAll(this);
			this.render();
		},
		
		render: function() {
			$(this.el).html(this.template);
			return this;
		},
		
		addStory: function(story) {
			var stories = this.$('.stories');
			var view = new App.Views.Story({
				model: story
			});
			stories.prepend(view.render().el);
		},
		
		addStories: function() {
			var stories = this.$('.stories');
			this.collection.each(function(story) {
				var view = new App.Views.Story({
					model: story
				});
				stories.append(view.render().el);
			});
		}
	});
});