var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(function( $ ) {
	'use strict';

	App.Models.Story = Backbone.Model.extend({
		parse: function(response) {
			if (response.success && response.success[0]) {
            	return response.success[0];
            }
            else {
	            return response;
            }
        }
	});
});