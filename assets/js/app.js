$(document).ready(function() {
	if (!$('html').hasClass("touch")) {
		var controller = $.superscrollorama();
		controller.pin($('#live p'), 800, {});
		controller.pin($('#love p'), 800, {});
		controller.pin($('#current-mp p'), 800, {});
		controller.pin($('#clint p'), 800, {});
		controller.pin($('#date p'), 800, {});
		controller.pin($('#decided p'), 800, {});
		controller.pin($('#nomination p'), 800, {});
		controller.pin($('#stay-home p'), 800, {});
		controller.pin($('#yourvote p'), 800, {});
		controller.pin($('#new-mp p'), 800, {});
		controller.pin($('#issues p'), 800, {});
		controller.pin($('#backbench p'), 800, {});
		controller.pin($('#support-us p'), 800, {});
		controller.pin($('#my-mp p'), 800, {});
		controller.pin($('#clear p'), 800, {});
		controller.pin($('#attitude-vancouver p'), 800, {});
		controller.pin($('#attitude-calgary p'), 800, {});
		controller.pin($('#vote p'), 800, {});
		controller.pin($('#great-mp p'), 800, {});
		controller.pin($('#turner p'), 800, {});
		controller.pin($('#oil-wealth p'), 800, {});
		controller.pin($('#diverse-economy p'), 800, {});
		controller.pin($('#vote-for p'), 800, {});
		controller.pin($('#vote-means p'), 800, {});
		controller.pin($('#everything p'), 800, {});
	}
});