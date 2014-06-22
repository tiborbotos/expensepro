define([], {

	requirejs: {
		paths: {
	      'jquery': 'lib/jquery/jquery',
	      'angular': 'lib/angular/angular',
	      'angular-route': 'lib/angular-route/angular-route',
	      'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
	      'angular-animate': 'lib/angular-animate/angular-animate',
	      'angular-ui-bootstrap': 'lib/angular-ui-bootstrap/ui-bootstrap-tpls-0.11.0',
	      'yepnope': 'lib/yepnope/yepnope',
		  'hello': 'lib/hello/dist/hello.all',
			'dpd': 'dpd'
		},

		  // angular does not support AMD out of the box, put it in a shim
		shim: {
	  	  'angular': ['jquery'],
	  	  'angular-route': ['angular'],
		  'angular-sanitize': ['angular'],
		  'angular-animate': ['angular'],
		  'angular-ui-bootstrap': ['angular']
		}
	}
});
