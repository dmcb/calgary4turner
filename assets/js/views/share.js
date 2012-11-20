var App = App || {
	Routers: {},
	Models: {},
	Collections: {},
	Views: {}
};

$(function( $ ) {
	'use strict';

	App.Views.Share = Backbone.View.extend({
		
		el: "#share",
		template: _.template($('#share-template').html()),
		
		events: {
			"input #name, #email, #story": "validation",
			"click #send": "submit"
		},
		
		initialize: function() {
			_.bindAll(this);
			this.render();
		},
		
		render: function() {
			var renderedContent = this.template();
			$(this.el).html(renderedContent).fadeIn('slow');
			return this;
		},
		
		validation: function() {
			var target = event.target.id;
			var data = {};
			data[target] = $('#' + target).val();
			$.ajax({
				type: 'POST',
				url: "assets/php/crud.php",
				data: data,
				dataType: 'json',
				success: function(response) {
					if (response.error[target]) {
						$("#" + target).addClass("error");
						$("#" + target + "_error").html(response.error[target]).css('display', 'block');
					} else if (!response.error[target]) {
						$("#" + target + "_error").css('display', 'none');
						$("#" + target).removeClass("error");
					}
				}
			});
		},
		
		submit: function() {
			$('#send').attr("disabled", true);
			$("#send").html("<img src=\"assets/images/loader.gif\" alt=\"Loading\"/>");
			$.ajax({
				type: 'POST',
				url: "assets/php/crud.php",
				data: { 
					name: $('#name').val(),
					email: $('#email').val(),
					story: $('#story').val()
				},
				dataType: 'json',
				success: function(response) {
					if (response.success) {
						$("#share").html("<span class=\"error\">Thank you for sharing your story!</span>").css('display', 'none').fadeIn('slow');
						var NewStory = new App.Models.Story(response.success);
						App.Collections.stories.unshift(NewStory);
					}
					else if (response.error) {
						$("#send").attr("disabled", false);
						$("#send").html("Send");
						
						var fields = ['name', 'email', 'story'];
						for (var i=0; i < fields.length; i++) {
							if (response.error[fields[i]]) {
								$("#" + fields[i]).addClass("error");
								$("#" + fields[i] + "_error").html(response.error[fields[i]]).css('display', 'block');
							} else {
								$("#" + fields[i] + "_error").css('display', 'none');
								$("#" + fields[i]).removeClass("error");
							}
						}
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					$("#send").attr("disabled", false);
					$("#send").html("Send");
					//$('#load').hide();
					alert(xhr.status);
					alert(thrownError);
					alert('Submission failed, please try again.');
				}
			});
			return false;
		}	
	});
});