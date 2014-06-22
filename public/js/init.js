requirejs.config({baseUrl:"./"});

requirejs(['js/config'], function(config){
	requirejs.config(config.requirejs);

	require(['js/app'], function(app) {
		app.init();
	});

});