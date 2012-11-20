var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(document).ready(function() {
	App.router = new App.Routers.AppRouter();
	Backbone.history.start();

	$('input, textarea').placeholder();
	$('h2').fitText(2.5, { minFontSize: '12px', maxFontSize: '36px' });
});
