define(['angular'], function() {

	var controllers;
    try {
        controllers = angular.module('em.controllers');
    } catch (error) {
        controllers = angular.module('em.controllers', []);
    }

    return controllers;
});