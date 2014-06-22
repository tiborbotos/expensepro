define(['angular'], function() {

	var emDirectives;
    try {
        emDirectives = angular.module('em.directives');
    } catch (error) {
        emDirectives = angular.module('em.directives', []);
    }


	//
	// https://github.com/EricWVGG/AngularSlideables
	//
	emDirectives.directive('slideable', function () {
		return {
			restrict:'C',
			compile: function (element, attr) {
				// wrap tag
				var contents = element.html();
				element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

				return function postLink(scope, element, attrs) {
					// default properties
					attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
					attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
					attrs.initiallyvisible = (attrs.initiallyvisible === undefined || attrs.initiallyvisible === 'false') ? 'false' : 'true';

					var css =  {'overflow': 'hidden',
						'transitionProperty': 'height',
						'transitionDuration': attrs.duration,
						'transitionTimingFunction': attrs.easing
					};
					if (attrs.initiallyvisible === 'false') {
						css['height'] = '0px';
					}
					element.css(css);
				};
			}
		};
	})
	.directive('slideToggle', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var target = document.querySelector(attrs.slideToggle);
				attrs.expanded = target.clientHeight > 0;
				element.bind('click', function() {
					var content = target.querySelector('.slideable_content');
					if(!attrs.expanded) {
						content.style.border = '1px solid rgba(0,0,0,0)';
						var y = content.clientHeight;
						content.style.border = 0;
						target.style.height = y + 'px';
					} else {
						target.style.height = '0px';
					}
					attrs.expanded = !attrs.expanded;
				});
			}
		}
	});


    return emDirectives;

});