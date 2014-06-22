define(['angular'], function() {

	var emModel;
    try {
        emModel = angular.module('em.model');
    } catch (error) {
        emModel = angular.module('em.model', []);
    }

    return emModel;

});