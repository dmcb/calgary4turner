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
        fetch: function(add, options) {
            var that = this;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: that.url,
                processData: false,
                success: function(response){
					if (add) {
						that.add(that.parse(response));
					}
					else {
						that.reset(that.parse(response));
					}
				}
            }, options);
            $.ajax(params);
         }
*/
	});
});