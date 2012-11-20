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
			"click a": "share"
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
		},
		
		share: function() {
			App.router.navigate(this.model.get('id'), {trigger: true});
		}
	});
	
	App.Views.Shared = Backbone.View.extend({
		el: "#shared",
		template: _.template($('#shared-template').html()),
		
		events: {
			"click #more": "loadStories",
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
			stories.append(view.render().el);
			// If we are out of stories, hide the more button (yes this assumes the oldest story is of id 1)
			if (story.id == "1") {
				$('#more').hide();
			}
		},
		
		loadStories: function() {
			console.log('Scroll top: ' + $(window).scrollTop()+200 + ', Doc height: ' + $(document).height() + ', Win height: ' + $(window).height());
			var additionalStories = new App.Collections.Stories();
			additionalStories.fetch({
				url: 'assets/php/crud.php?id=' + App.globalState.get('oldestID'),
				success: function() {
					additionalStories.each(function(story) {
						App.Collections.stories.add(story);
					});
					App.globalState.set('oldestID', App.Collections.stories.last().id);
				}
			});
		},
		
		newStory: function(story) {
			var stories = this.$('.stories');
			var view = new App.Views.Story({
				model: story
			});
			stories.prepend(view.render().el);
		}
	});
});