var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(function( $ ) {
	'use strict';

	App.Collections.Stories = Backbone.Collection.extend({
		model: App.Models.Story,
        parse: function(response) {
            return response.success;
        }/*
,
        sync: function(method, model, options) {
            var that = this;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: that.url,
                processData: false
            }, options);

            return $.ajax(params);
        }
*/
	});
});